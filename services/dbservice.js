const AWS = require('aws-sdk')

AWS.config.update({ region: "us-east-2" })
const documentClient = new AWS.DynamoDB.DocumentClient({ region: "us-east-2" })

/* 
*   Get record by key
*   @params: {string} table The table Name
*   @params: {object} input The input value object {key: 'key', value: 'value'}
*   @return : Promise
*/
exports.getByKey = async (table, input) => {
    let key = {}
    key[input.key] = input.value
    const params = {
        TableName: table,
        Key: key
    }
    try {
        return await documentClient.get(params).promise()
    } catch(err) {
        return err
    }
}

/* 
*   Get all records in table 
*   @params: {string} table The table Name
*   @return : Promise
*/
exports.getAll = async (table) => {
    var params = {
        TableName: table
    }
    try {
        return await documentClient.scan(params).promise()
    } catch(err) {
        return err
    }
}

/* 
*   Insert data into table 
*   @params: {string} table The table Name
*   @params: {object} input The input value object
*   @return : Promise
*/
exports.insert = async (table, input) => {
    const params = {
        TableName: table,
        Item: {
            "createdAt": Date.now(),
            ...input
        }
    }
    try {
        return documentClient.put(params).promise()
    } catch(err) {
        return err
    }
}
