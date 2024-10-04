import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
	conn: Mongoose | null;
	promise: Promise<Mongoose> | null;
}

// Extend the global object to include the mongoose property.
declare global {
	// eslint-disable-next-line no-var
	var mongoose: MongooseConnection | undefined;
}

let cached: MongooseConnection = global.mongoose || {
	conn: null,
	promise: null,
};

if (!cached) {
	cached = { conn: null, promise: null };
	global.mongoose = cached;
}

export const connectToDatabase = async () => {
	if (cached.conn) return cached.conn;

	if (!MONGODB_URL) throw new Error("Missing MONGODB_URL");

	cached.promise =
		cached.promise ||
		mongoose.connect(MONGODB_URL, {
			dbName: "nextify",
			bufferCommands: false,
		});

	cached.conn = await cached.promise;

	return cached.conn;
};
