import { ApolloServer } from 'apollo-server'
import { PrismaClient } from '@prisma/client'
import path from 'path'
import { readFileSync } from 'fs'
import resolvers from './resolvers'

// 1 - Query
// const typeDefs = `
//   type Query {
//     info: String!
//   }
// `

const typeDefs = readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8')
const orm = new PrismaClient()

// 2 - Resolver
// const resolvers = {
//   Query: {
//     info: () => `This is the API of Platzi Node GraphQl`,
//   },
// }

// 3 - iniciar servidor

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    orm,
  },
})

server.listen().then(({ url }) => console.log(`Server is running on ${url}`))
