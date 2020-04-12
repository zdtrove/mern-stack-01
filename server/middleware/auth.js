require('dotenv').config();
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
	const token = req.header('auth-token');
	if (!token) {
		return res.status(401).json({errors: {msg: 'No token, access denied'}});
	}
	try {
		const decoded = jwt.verify(token, process.env.SECRET);
		req.user = decoded.user;
		next();
	} catch (err) {
		console.log(err.message);
		res.status(401).json({errors: {msg: err.message}});
	}
}

module.exports = auth;