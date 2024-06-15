const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const auth = require("./routes/auth")
const client = require("./routes/client")
const user = require("./routes/user")
const db = process.env.MONGOURI || require("./config/keys").mongoURI
const passport = require("passport")
const path = require("path")

const server = express()
server.use(cors())

mongoose
    .connect(
        db,
        // { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err))

server.use(
    bodyParser.urlencoded({
        extended: false
    })
)
server.use(bodyParser.json())

server.use(passport.initialize())
require("./config/passport")(passport)

server.use("/auth/", auth)
server.use("/client/", client)
server.use("/user/", user)

server.use(express.static("frontend/build"))
server.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend/build/index.html"))
})

const port = process.env.PORT || 5000

server.listen(port, () => console.log(`client-auth up and running on port ${port}!`))
