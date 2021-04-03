const dbService = require('../services/dbservice.js')
const { v4: uuidv4 } = require("uuid")

// add value1 and value2
const add = (input) => {
    return parseFloat(input.value1) + parseFloat(input.value2)
}

// subtract value2 from value1
const subtract = (input) => {
    return input.value1 - input.value2
}

// multiply value1 by value2
const multiply = (input) => {
    return input.value1 * input.value2
}

// divide value1 by value2
const divide = (input) => {
    if (input.value2) {
       return parseFloat(input.value1 / input.value2)
    }
    return 0
}

/* 
*   Get result for operation
*   @params: {object} input The input value object
*   @return : number
*/
const operations = (input) => {
    let result = 0
    switch(input.operation) {
        case "add": {
            result = add(input)
            break;
        }
        case "subtract": {
            result = subtract(input)
            break;   
        }
        case "multiply": {
            result = multiply(input)
            break;   
        }
        case "divide": {
            result = divide(input)
            break;   
        }
        default: {
            result = 0
            break
        }
    }
    return result
}

/* 
*   Calculate result for operation
*   @params: {object} input The input value object
*   @return : Promise
*/
const calculate = async (input) => {
    try {
        var params = input.arguments
        const table = process.env.CALCULATE_TABLE
        let response = { CalculatorResponse: [] }
        
        if (input.info.parentTypeName === 'Mutation'
            && input.info. fieldName === 'saveCalculations') {
                const result = operations(params)
                const calId = uuidv4()
                const insertResult = await dbService.insert(table, {
                    cal_id: calId,
                    value1: params.value1,
                    value2: params.value2,
                    operation: params.operation,
                    result: result,
                })
                const calculation = await dbService.getByKey(table, { key: "cal_id", value: calId })
                response.CalculatorResponse = [calculation.Item]
        } else if(input.info.parentTypeName === 'Query'
            && input.info. fieldName === 'getCalculations') {
                const calculation = await dbService.getAll(table)
                response.CalculatorResponse = calculation.Items
        }
        return response
    }  catch(err) {
        return err
    }
}

module.exports = {
    calculate
}
