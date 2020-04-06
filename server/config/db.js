require('dotenv').config();

const mongoose = require('mongoose');

const url = process.env.URL_LOCAL;

const connectDB = async () => {
	try {
		await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
		console.log('Connected to MongoDB');
	} catch (err) {
		console.error(err.message);
		process.exit(1);
	}
}

module.exports = connectDB;