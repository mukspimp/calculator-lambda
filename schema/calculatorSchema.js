exports.schema = {
  type: "object",
  properties: {
    value1: {type: "integer"},
    value2: {type: "integer"},
    operation: {type: "string", "minLength": 3 }
  },
  required: ["value1", "value2", "operation"],
  additionalProperties: false,
}