export default function DigitalOutputChannel(props) {
    return (
        <div className="mb-3">
            <div className="rounded pb-2 bg-dark d-flex justify-content-center pt-3">
                <h2>{(parseInt(props.state) > 0) ? "ON" : "OFF"}</h2>
            </div>
            <div className="bg-dark d-flex justify-content-center pb-3 rounded-bottom">
                <label className="switch align-self-center">
                    <input
                        type="checkbox"
                        checked={(props.state > 0) ? true : false}
                        onChange={() => props.setChannel(props.number, (props.state > 0) ? 0 : 1)}
                        disabled={(props.connected !== "Connected")}
                    />
                    <span className="slider round" style={{ cursor: (props.connected === "Connected") ? "" : "default" }} />
                </label>
            </div>
        </div>
    )
}