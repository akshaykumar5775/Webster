const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator')

// @route    GET /api/userAuth
// @desc     Get user object in response when called with token
// @access   Private
router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

// @route    POST /api/userAuth
// @desc     Login user and get token
// @access   Public
router.post('/',
    // Data Validation
    body('email', 'Email should be valid').isEmail(),
    body('password', 'Password is required').exists(),

    // Response sending
    async (req, res) => {

        // Catching validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }


        const { email, password } = req.body;

        try {
            // Check if user exists
            let user = await User.findOne({ email: email });

            if (!user) {
                res.status(400).json({ errors: [{ msg: "Invalid credentials." }] })
            }

            const isMatch = await bcryptjs.compare(password, user.password);

            if (!isMatch) {
                res.status(400).json({ errors: [{ msg: "Invalid credentials." }] })
            }

            // Return jsonwebtoken :- This is required because we want our user to be directly logged in when registered.
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload,
                config.get('jwtSecret'),
                { expiresIn: 36000000 },
                (err, token) => {
                    if (err) throw err;
                    console.log(`${token}`);
                    console.log("User Logged In");
                    res.json({ token })
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })


module.exports = router;