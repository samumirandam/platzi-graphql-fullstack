import { GraphQLScalarType, Kind } from 'graphql'

export const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Represents a date time object',
  serialize(value) {
    if (typeof value === 'string') {
      const date = new Date(value)
      return date.toISOString() // Convert outgoing Date to ISOString for JSON
    }
  },
  parseValue(value) {
    if (typeof value === 'string') {
      return new Date(value) // Convert incoming integer to Date
    }
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)) // Convert hard-coded AST string to integer and then to Date
    }
    return null // Invalid hard-coded value (not an integer)
  },
})
