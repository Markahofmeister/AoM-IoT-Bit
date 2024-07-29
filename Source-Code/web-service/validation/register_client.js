const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateClient(data) {
    let errors = {}

    // Convert empty fields to an empty string to use validator functions
    data.name = !isEmpty(data.name) ? data.name : ""
    data.user_id = !isEmpty(data.user_id) ? data.user_id : ""
    data.type = !isEmpty(data.type) ? data.type : "0"

    // Name check
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name is required"
    }

    // User ID check
    if (Validator.isEmpty(data.user_id)) {
        errors.user_id = "User ID is required"
    }

    // Type check
    if (Validator.isEmpty(data.type)) {
        errors.type = "Type is required"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}