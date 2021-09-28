const validate = require("./validate");
const validateRoles = require("./validate-roles");
const validateJWT = require('./validate-jwt');

module.exports = {
    ...validate,
    ...validateJWT,
    ...validateRoles
}