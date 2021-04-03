const calculatorController = require("./controller/calculator.js")

exports.handler = async (event, context) => {
    try {
        const response = await calculatorController.calculate(event)
        return response
    } catch(err) {
        return err
    }
}
