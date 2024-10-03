import mongoose, { Mongoose } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
	conn: Mongoose | null;
	promise: Promise<Mongoose> | null;
}

// Extend global object to include mongoose connection type
declare global {
	// Allow global to have a mongoose property (Next.js specific)
	// We explicitly state the type as MongooseConnection or undefined.
	var mongoose: MongooseConnection | undefined;
}

// Type assertion to ensure global.mongoose exists with the correct type
let cached: MongooseConnection = global.mongoose ?? {
	conn: null,
	promise: null,
};

export const connectToDatabase = async () => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!MONGODB_URL) {
		throw new Error("Missing MONGODB_URL");
	}

	cached.promise =
		cached.promise ??
		mongoose.connect(MONGODB_URL, {
			dbName: "nextify", // Updated database name
			bufferCommands: false,
		});

	cached.conn = await cached.promise;
	global.mongoose = cached; // Ensure to set the global value for future use

	return cached.conn;
};
