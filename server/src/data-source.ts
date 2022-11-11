import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "postgres",
	password: "MySecretPass10",
	database: "jwt-auth",
	synchronize: true,
	logging: false,
	entities: [User],
	migrations: [],
	subscribers: [],
});
