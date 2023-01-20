#include <ArduinoJson.h> // Necessary to make API request
#include <WiFiNINA.h>    // Library to connect Arduino to wifi and to Adafruit IO

#include "secrets.h"

unsigned long requestInterval = 2000; // Programmable delay between requests, in milliseconds
String server = "io.adafruit.com";    // Name of address for Adafruit IOT Cloud

WiFiClient client; // Initialize the client library
int wifi_status;   // Used to report Wifi connectivity information

bool initializeCredentials()
{
// if SD_CARD is not working, simply return true for setup() to continue
  Serial.println("SD card not configured, reading from secrets.h instead.");
  return true;
}

void printWifiStatus()
{
  Serial.println("");

  Serial.println("**Current Wifi Status");

  /* Print the SSID of the network you're attached to */
  Serial.print("****SSID: ");
  Serial.println(WiFi.SSID());

  /* Print your board's IP address */
  Serial.print("****IP Address: ");
  Serial.println(WiFi.localIP());

  /* Print the received signal strength */
  Serial.print("****signal strength (RSSI):");
  Serial.print(WiFi.RSSI());
  Serial.println(" dBm");

  Serial.println("");
}

bool wifi_connected()
{
  wifi_status = WiFi.status();
  return (wifi_status == WL_CONNECTED);
}

bool connectToWIFI()
{
  /* Check for the WiFi module */
  if (WiFi.status() == WL_NO_MODULE)
  {
    Serial.println("Communication with WiFi module failed!");
    return false;
  }

  /* Check firmware version */
  String fv = WiFi.firmwareVersion();
  if (fv < "1.0.0")
  {
    Serial.println("Please upgrade the firmware");
    return false;
  }

  /* Attempt to connect to the Wifi network 1 time */
  int attempt_count = 0;
  while ((wifi_status != WL_CONNECTED) && (attempt_count < 3))
  {
    attempt_count += 1;

    Serial.println("Attempt (" + String(attempt_count) + ") to connect to Wifi Network @ SSID: " + ssid + "...");

    /* Connect to WPA/WPA2 network. NOTE: Change the next lines if using open or WEP network */

    /* Buffer for security */
    char buffer_ssid[ssid.length() + 1];
    ssid.toCharArray(buffer_ssid, ssid.length() + 1);

    /* Buffer for security */
    char buffer_pass[pass.length() + 1];
    pass.toCharArray(buffer_pass, pass.length() + 1);

    wifi_status = WiFi.begin(buffer_ssid, buffer_pass);

    ////Debugging Code
    // printWifiStatus();

    /* Wait 10 seconds for connection */
    delay(10000);
  }

  if (attempt_count < 3)
  {
    Serial.println("Sucessfully connected to Wifi Network @ SSID: " + ssid + "!");
    printWifiStatus();
    return true;
  }
  else
  {
    Serial.println("Failed to connect to Wifi Network @ SSID: " + ssid + "!");
    return false;
  }
}

bool disconnectFromWIFI()
{
  bool response = false;

  /* Check for the WiFi module */
  if (WiFi.status() == WL_NO_MODULE)
  {
    Serial.println("Communication with WiFi module failed!");
    response = false;
  }

  /* Check firmware version */
  String fv = WiFi.firmwareVersion();
  if (fv < "1.0.0")
  {
    Serial.println("Please upgrade the firmware");
    response = false;
  }

  /* Keep attempting to connect to the Wifi network */
  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("Disconnecting from Wifi @ SSID: " + ssid + "...");

    WiFi.end();
    response = true;
  }
  else
  {
    response = false;
  }

  /* Wait 1 seconds to report */
  delay(1000);

  return response;
}

String http_Request_GET()
{

  /* Close any connection before send a new request. This will free the socket on the Nina module. */
  client.stop();

  Serial.println("");
  Serial.println("Attempting to connect to cloud server " + server + "...");

  /* Buffer for security */
  char buffer_server[server.length() + 1];
  server.toCharArray(buffer_server, server.length() + 1);

  if (client.connect(buffer_server, 80))
  {
    Serial.println("Sucessfully connected to server " + server + "!");

    Serial.println("Attempting to get message...");

    /* Make a HTTP request */
    client.println("GET /api/v2/" + adafruit_io_username + "/feeds/" + adafruit_io_feed_key + "/data/last HTTP/1.1");

    /* Calls Adafruit IO's API to retrieve the last data value recorded in a provided list */
    client.println("Host: " + server);
    client.println("Connection: close");
    client.println("Content-Type: application/json");
    client.println("X-AIO-Key: " + adafruit_io_key);

    /* Terminate headers with a blank line */
    if (client.println() == 0)
    {
      Serial.println(F("Failed to send request"));
      return "NULL";
    }

    /* Check HTTP status */
    char wifi_status[32] = {0};
    client.readBytesUntil('\r', wifi_status, sizeof(wifi_status));
    if (strcmp(wifi_status, "HTTP/1.1 200 OK") != 0)
    {
      Serial.print(F("Unexpected response: "));
      Serial.println(wifi_status);
      return "NULL";
    }

    /* Skip HTTP headers */
    char endOfHeaders[] = "\r\n\r\n";
    if (!client.find(endOfHeaders))
    {
      Serial.println(F("Invalid response1"));
      return "NULL";
    }

    /* Skip Adafruit headers */
    char endOfHeaders2[] = "\r";
    if (!client.find(endOfHeaders2))
    {
      Serial.println(F("Invalid response2"));
      return "NULL";
    }

    /* Deserialize JSON */
    const size_t capacity = JSON_OBJECT_SIZE(12) + 170;

    /* The JSON Document to Deserialize*/
    StaticJsonDocument<capacity> doc;

    DeserializationError deserializationError = deserializeJson(doc, client);

    if (deserializationError)
    {
      Serial.print(F("deserializeJson() failed: "));
      Serial.println(deserializationError.c_str());
      return "NULL";
    }

    const char *value = doc["value"];
    String val = String(value);

    return val;
  }
  else
  {
    return "NULL";
  }
}

bool http_Request_POST(String message)
{
  const size_t capacity = JSON_ARRAY_SIZE(3) + 3 * JSON_OBJECT_SIZE(2) + 2 * JSON_OBJECT_SIZE(3) + 130;

  /* Create the JSON Document */
  StaticJsonDocument<capacity> doc;

  /* Add the "location" object */
  JsonObject location = doc.createNestedObject("location");
  location["lat"] = 0;
  location["lon"] = 0;
  location["ele"] = 0;

  /* Create JSON nested array for group */
  JsonArray feeds = doc.createNestedArray("feeds");

  /* Fill first array index with feed1 */
  JsonObject feed1 = feeds.createNestedObject();
  feed1["key"] = String(adafruit_io_feed_key);
  feed1["value"] = message;

  /* Close any connection before send a new request. This will free the socket on the Nina module. */
  client.stop();

  Serial.println("");
  Serial.println("Attempting to connect to cloud server " + server + "...");

  /* Buffer for security */
  char buffer_server[server.length() + 1];
  server.toCharArray(buffer_server, server.length() + 1);

  if (client.connect(buffer_server, 80))
  {
    Serial.println("Sucessfully connected to server " + server + "!");

    Serial.println("Attempting to send message: " + message);

    /* Make a HTTP request */
    client.println("POST /api/v2/" + adafruit_io_username + "/groups/" + adafruit_io_group_key + "/data HTTP/1.1");
    Serial.println("POST /api/v2/" + adafruit_io_username + "/groups/" + adafruit_io_group_key + "/data HTTP/1.1");

    /* Calls Adafruit IO's API to upload the string decided by the conditional */
    client.println("Host: " + server);
    client.println("Connection: close");
    client.print("Content-Length: ");
    client.println(measureJson(doc));
    client.println("Content-Type: application/json");
    client.println("X-AIO-Key: " + adafruit_io_key);

    /* Terminate headers with a blank line */
    client.println();

    /* Send JSON document in body */
    serializeJson(doc, client);

    return true;
  }
  else
  {
    return false;
  }
}

bool httpRequest_Multiple(String messages[])
{

  /*
   * https://io.adafruit.com/api/docs/#operation/createGroupData
   *
   * POST /{username}/groups/{group_key}/data
   *
   * JSON:
   *
   *  {
   *    "location": {
   *      "lat": 0,
   *      "lon": 0,
   *      "ele": 0
   *    },
   *   "feeds": [
   *     {
   *       "key": "string",
   *       "value": "string"
   *     }
   *   ],
   *   "created_at": "string"
   *  }
   *
   */
  return false;
}