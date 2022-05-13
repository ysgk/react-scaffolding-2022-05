import type { Resolvers } from '@my/schema'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import fs from 'fs'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const typeDefs = fs.readFileSync(path.resolve(__dirname, '../schema/schema.graphql')).toString()

const resolvers: Resolvers = {}

const mocks: Partial<Record<keyof Resolvers, any>> = {}

const startApolloServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)
  const port = process.env.PORT || 5017

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    mocks,
    mockEntireSchema: false,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })

  // フロントエンドの挙動確認のため意図的に遅延させます。
  process.env.NODE_ENV === 'development' &&
    app.use((req, res, next) => setTimeout(next, 200 + Math.floor(Math.random() * 800)))

  await server.start()
  server.applyMiddleware({
    app,
    path: '/',
  })

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}

startApolloServer()
