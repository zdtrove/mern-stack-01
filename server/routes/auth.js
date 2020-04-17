const router = require('express').Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// user model
const User = require('../models/User');

// get user
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select("-password");
		res.json(user);
	} catch (err) {
		res.status(500).json({errors: {msg: 'Server Error'}});
	}
});

// login
router.post('/', 
	[
		check('email', 'Please provide a valid email').isEmail(),
		check('password', 'Please provide the password').exists()
	], 
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}
		const {email, password} = req.body;
		try {
			let user = await User.findOne({email});
			if (!user) {
				return res.status(400).json({errors: {msg: 'Invalid Credentials'}});
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				return res.status(400).json({errors: {msg: 'Invalid Credentials'}});
			}
			const payload = {
				user: {
					id: user.id
				}
			}
			jwt.sign(payload, process.env.SECRET, {
				expiresIn: 3600
			}, (err, token) => {
				if (err) throw err;
				res.json({token});
			});
		} catch (err) {
			res.status(500).json({errors: {msg: 'Server Error'}});
		}
	}
);

module.exports = router;
