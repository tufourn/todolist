const AWS = require('aws-sdk');
AWS.config.update( {
    region: 'us-east-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'common_todos';
const common_path = '/common'

exports.handler = async (event) => {
    console.log('request event: ', event);
    let response;
    switch (true) {
        case event.httpMethod === 'GET' && event.requestContext.resourcePath === common_path:
            response = getCommonTodos();
            break;
        case event.httpMethod === 'POST' && event.requestContext.resourcePath === common_path:
            response = addCommonTodo(JSON.parse(event.body));
            break;
        case event.httpMethod === 'DELETE' && event.requestContext.resourcePath === common_path + '/{todoId}':
            response = deleteTodo(event.pathParameters.todoId);
            break;
        case event.httpMethod === 'PATCH' && event.requestContext.resourcePath === common_path + '/{todoId}':
            response = modifyTodo(event.pathParameters.todoId, JSON.parse(event.body));
            break;
        default:
            response = buildResponse(404, '404 not found')
    }
    return response;
}

async function getCommonTodos() {
    const params = {
        TableName: dynamodbTableName
    }
    const allCommonTodos = await scanDynamoRecords(params, []);
    const body = {
        todos: allCommonTodos
    }
    return buildResponse(200, body)
}

async function scanDynamoRecords(scanParams) {
    try {
        const dynamoData = await dynamodb.scan(scanParams).promise();
        return dynamoData.Items;
    } catch(error) {
        console.error(error);
    }
}

async function addCommonTodo(requestBody) {
    const params = {
        TableName: dynamodbTableName,
        Item: requestBody
    }
    return await dynamodb.put(params).promise().then(() => {
        const body = {
            Operation: 'ADD',
            Message: 'SUCCESS',
            Item: requestBody
        }
        return buildResponse(200, body);
    }, (error) => {
        console.error(error);
    })
}

async function deleteTodo(todoId) {
    const params = {
        TableName: dynamodbTableName,
        Key: {
            'todoId': todoId
        },
        ReturnValues: 'ALL_OLD'
    }
    return await dynamodb.delete(params).promise().then((response) => {
        const body = {
            Operation: 'DELETE',
            Message: 'SUCCESS',
            Item: response
        }
        return buildResponse(200, body);
    }, (error) => {
        console.error(error);
    })
}

function modifyTodo(todoId, data) {
    return update(dynamodbTableName, 'todoId', todoId, data).then((response) => {
        const body = {
            Operation: 'UPDATE',
            Message: 'SUCCESS',
            Item: response
        }
        return buildResponse(200, body);
    }, (error) => {
        console.error(error);
    });
}

async function update(tableName, primaryKeyName, primaryKeyValue, updates) {
    const keys = Object.keys(updates)
    const keyNameExpressions = keys.map(name => `#${name}`)
    const keyValueExpressions = keys.map(value => `:${value}`)
    const UpdateExpression = "set " + keyNameExpressions
        .map((nameExpr, idx) => `${nameExpr} = ${keyValueExpressions[idx]}`)
        .join(", ");
    const ExpressionAttributeNames = keyNameExpressions
        .reduce((exprs, nameExpr, idx) => ({ ...exprs, [nameExpr]: keys[idx] }), {})
    const ExpressionAttributeValues = keyValueExpressions
        .reduce((exprs, valueExpr, idx) => ({ ...exprs, [valueExpr]: updates[keys[idx]] }), {})

    const params = {
        TableName: tableName,
        Key: { [primaryKeyName]: primaryKeyValue },
        ReturnValues: 'ALL_NEW',
        UpdateExpression,
        ExpressionAttributeNames,
        ExpressionAttributeValues,
    };
    return dynamodb.update(params).promise();
}

function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "Access-Control-Allow-Origin" : "*",
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
}

