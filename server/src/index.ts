import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { json } from "body-parser";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./UserResolver";
import { AppDataSource } from "./data-source";

(async () => {
	const app = express();

	app.get("/", (_req, res) => res.send("hello"));

	await AppDataSource.initialize();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [UserResolver],
		}),
	});

	await apolloServer.start();

	app.use(
		"/graphql",
		json(),
		expressMiddleware(apolloServer, {
			context: async ({ req, res }) => ({
				req,
				res,
			}),
		}),
	);

	app.listen(process.env.PORT, () => {
		console.log(`Express server is running at port: ${process.env.PORT}`);
	});
})();
