const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateClient(data) {
    let errors = {}

    // Convert empty fields to an empty string to use validator functions
    data.name = !isEmpty(data.name) ? data.name : ""
    data.user_id = !isEmpty(data.user_id) ? data.user_id : ""

    // Name check
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required"
    }

    // User ID check
    if (Validator.isEmpty(data.user_id)) {
        errors.user_id = "User ID is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}