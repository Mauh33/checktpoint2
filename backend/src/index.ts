import "reflect-metadata";
import express from 'express';
import http from "http";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import db from "./db";
import PaysResolver from "./resolvers/ajoutPaysResolver";


const app = express();
const port = 4001;

app.use(express.json());


app.use(express.json())

const typeDefs = `#graphql
  type Pays{
    id: Int
    code: String
    name: String
    emoji:
  }
  type Continent{
    id: Int
    name: String
    code: String
    pays_id: int
  }

`;

// resolvers


buildSchema({
  resolvers: [PaysResolver],
}).then(async (schema) => {
  await db.initialize();
  const server = new ApolloServer({ schema });
  startStandaloneServer(server, {
    listen: { port: 4001 },
  }).then(({ url }) => console.log(`graphql server listening on ${url}`));
  const { url } = await startStandaloneServer(server, { listen: { port } });
  console.log(`graphql server listening on ${url}`);
});
