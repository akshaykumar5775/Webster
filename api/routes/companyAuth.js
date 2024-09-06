const express = require("express");
const { body, validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require('../middleware/auth');
const Company = require("../models/Company");
const router = express.Router();

// @route    GET /companyAuth
// @desc     Send data of comapany based on the token
// @access   Private
router.get("/", auth, async (req, res) => {

    try {
        const company = await Company.findById(req.user.id).select("-password");

        res.json(company);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route    POST /companyAuth
// @desc     Authenticate company and get token
// @access   Public
router.post('/',
    // Data validation
    body('email', 'Email should be valid').isEmail(),
    body('password', 'Password is required').exists(),

    async (req, res) => {

        // Catching validatio errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { email, password } = req.body;

        try {
            // Check if company exists
            let company = await Company.findOne({ email: email });

            if (!company) {
                res.status(400).json({ errors: [{ msg: "Invalid credentials." }] })
            }


            const isMatch = await bcryptjs.compare(password, company.password);

            if (!isMatch) {
                res.status(400).json({ errors: [{ msg: "Invalid credentials." }] })
            }

            // Return jsonwebtoken :- This is required because we want our user to be directly logged in when registered.
            const payload = {
                user: {
                    id: company.id
                }
            }

            jwt.sign(payload,
                config.get('jwtSecret'),
                { expiresIn: 36000000 },
                (err, token) => {
                    if (err) throw err;
                    console.log(`${token}`);
                    console.log("Company Logged In");
                    res.json({ token })
                });

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
)


module.exports = router;