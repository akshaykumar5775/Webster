const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const app = express();
require("../db/connection").default;
const { body, validationResult } = require('express-validator');

const User = require('../models/User');


// @route    POST /registerUser
// @desc     Register User
// @access   Public
router.post('/',

    body('name', 'Name is required').not().isEmpty(),
    body('email', 'Email should be valid').isEmail(),
    body('password', 'Password should be of minimum length 5.').isLength({ min: 5 }),

    async (req, res) => {

        // Checking for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { name, email, password } = req.body;

        try {
            const userExist = await User.findOne({ email: email });

            if (userExist) {
                return res.status(422).json({ errors: [{ msg: "User already Exist." }] });
            }

            const user = new User({ name, email, password });

            // Encrypt password using bcrypt
            const salt = await bcryptjs.genSalt(12);           // To create a hashing
            user.password = await bcryptjs.hash(password, salt);

            await user.save();

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
                    console.log(`${token} User Registered`);
                    res.json({ token })
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    });


module.exports = router;
