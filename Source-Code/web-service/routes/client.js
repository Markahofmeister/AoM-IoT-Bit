const bcrypt = require("bcryptjs")
const crypto = require("crypto")
const express = require("express")
const Client = require("../models/Client")
const User = require("../models/User")
const validateRegisterClient = require("../validation/register_client")
const validateUpdateClient = require("../validation/update_client")
const validateDeleteClient = require("../validation/delete_client")

const router = express.Router()

// Register a new client
router.post("/register", (req, res) => {
    // Check validation
    const { errors, isValid } = validateRegisterClient(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    User.findOne({ _id: req.body.user_id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ user_id: "User " + req.body.user_id + " does not exist" })
            }
            else {
                const newClient = new Client({
                    name: req.body.name,
                    uuid: "client-" + crypto.randomUUID(),
                    user_uuid: user.uuid,
                    channels: []
                })
                // Hash token before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) throw err
                    // Generate hex token
                    crypto.randomBytes(32, (err, buffer) => {
                        if (err) throw err
                        let token = buffer.toString("hex")
                        bcrypt.hash(token, salt, (err, hash) => {
                            if (err) throw err
                            newClient.token = hash
                            newClient
                                .save()
                                .then(() => {
                                    res.status(201).json({ user_uuid: newClient.user_uuid, uuid: newClient.uuid, token: token })
                                })
                                .catch(err => {
                                    console.log(err)
                                    return res.status(500).json({ error: err })
                                })
                        })

                    })
                })
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ error: err })
        })
})

// Update a client
router.post("/update", (req, res) => {
    // Check validation
    const { errors, isValid } = validateUpdateClient(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const uuid = req.body.uuid
    User.findOne({ _id: req.body.user_id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ user_id: "User " + req.body.user_id + " does not exist" })
            }
            else {
                Client.findOne({ uuid: uuid, user_uuid: user.uuid })
                    .then(client => {
                        if (!client) {
                            return res.status(404).json({ uuid: "Client " + uuid + " does not exist" })
                        }
                        else {
                            client.name = req.body.name
                            // TODO update channels
                            console.log(req.body.channels)
                            client.save()
                                .then(updatedClient => {
                                    return res.status(200).json(updatedClient)
                                })
                                .catch(err => {
                                    return res.status(500).json({ error: err })
                                })
                        }
                    })
                    .catch(err => {
                        return res.status(500).json({ error: err })
                    })
            }
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})

// Delete a client
router.post("/delete", (req, res) => {
    // Check validation
    const { errors, isValid } = validateDeleteClient(req.body)
    if (!isValid) {
        return res.status(400).json(errors)
    }
    const uuid = req.body.uuid
    User.findOne({ _id: req.body.user_id })
        .then(user => {
            if (!user) {
                return res.status(404).json({ user_id: "User " + req.body.user_id + " does not exist" })
            }
            else {
                // Delete client devices
                Client
                    .findOne({ uuid: uuid, user_uuid: user.uuid })
                    .then(client => {
                        if (!client) {
                            return res.status(404).json({ uuid: "Client " + uuid + " does not exist" })
                        } else {
                            // Delete client
                            Client
                                .deleteOne({ uuid: uuid })
                                .then(() => {
                                    return res.status(200).json({ message: "Successfully deleted client " + uuid })
                                })
                                .catch(err => {
                                    console.log(err)
                                    return res.status(500).json({ error: err })
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        return res.status(500).json({ error: err })
                    })
            }
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({ error: err })
        })
})

// Get all of a user's clients
router.post("/all", (req, res) => {
    const user_id = req.body.user_id
    if (!user_id) {
        return res.status(400).json({ user_id: "User is required" })
    }
    User
        .findOne({ _id: user_id })
        .then(findUser => {
            if (!findUser) {
                return res.status(404).json({ user_id: "User " + user_id + " does not exist" })
            }
            else {
                Client
                    .find({ user_uuid: findUser.uuid })
                    .then(clients => {
                        return res.status(200).json(clients)
                    })
                    .catch(err => {
                        return res.status(500).json({ error: err })
                    })
            }
        })
        .catch(err => {
            return res.status(500).json({ error: err })
        })
})

module.exports = router