const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateClient(data) {
    let errors = {}

    // Convert empty fields to an empty string to use validator functions
    data.name = !isEmpty(data.name) ? data.name : ""
    data.uuid = !isEmpty(data.uuid) ? data.uuid : ""
    data.user_id = !isEmpty(data.user_id) ? data.user_id : ""
    data.io = !isEmpty(data.io) ? data.io : ""
    data.signal = !isEmpty(data.signal) ? data.signal : ""

    // Name check
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required"
    }

    // UUID check
    if (Validator.isEmpty(data.uuid)) {
        errors.uuid = "UUID is required"
    }

    // User ID check
    if (Validator.isEmpty(data.user_id)) {
        errors.user_id = "User ID is required"
    }

    // IO check
    if (Validator.isEmpty(data.io)) {
        errors.io = "IO is required"
    }

    // Signal check
    if (Validator.isEmpty(data.signal)) {
        errors.signal = "Signal is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}