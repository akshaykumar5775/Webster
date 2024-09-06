const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { body, validationResult } = require("express-validator");

const Company = require("../models/Company");

// @route    POST api/company
// @desc     Register Company
// @access   Public
router.post("/",
    body("companyname", "Company Name is required").not().isEmpty(),
    body("email", "Email should be valid").isEmail(),
    body("password", "Password should be of minimum length 5.").isLength({
        min: 5,
    }),

    async (req, res) => {
        // Checking for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { companyname, email, password } = req.body;

        try {
            const companyExist = await Company.findOne({ email: email });

            if (companyExist) {
                return res
                    .status(422)
                    .json({ errors: [{ msg: "Company already Exist." }] });
            }

            const company = new Company({ companyname, email, password });

            // Encrypt password using bcrypt
            const salt = await bcryptjs.genSalt(12); // To create a hashing
            company.password = await bcryptjs.hash(password, salt);

            await company.save();

            // Return jsonwebtoken :- This is required because we want our user to be directly logged in when registered.
            const payload = {
                user: {
                    id: company.id,
                },
            };
            jwt.sign(
                payload,
                config.get("jwtSecret"),
                { expiresIn: 36000000 },
                (err, token) => {
                    if (err) throw err;
                    console.log(`${token} Company Registered`);
                    res.json({ token });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
);

module.exports = router;
