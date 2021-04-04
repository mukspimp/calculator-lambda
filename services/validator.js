const Ajv = require("ajv")

const ajv = new Ajv()

/* 
*   Validate schema
*   @params: {object} request data
*   @params: {object} schema object for validate
*   @return : Object
*/
exports.validate = (data, schema) => {
    try {
        const validate = ajv.compile(schema)
        const valid = validate(data)
        if (!valid) console.log(validate.errors)
        return { valid: valid, err: validate.errors || null } 
    } catch(err) {
        return err
    }
}