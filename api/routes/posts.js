const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const CompanyPost = require("../models/CompanyPost");
const UserPost = require("../models/UserPost");
const User = require("../models/User");
const Company = require("../models/Company");

// User Post Routes

// @route    POST /posts/createUserPost
// @desc     User Create a post
// @access   Private
router.post(
    "/createUserPost",
    [auth, body("text", "Text is required").not().isEmpty()],
    async (req, res) => {
        // Checking for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select("-password");

            const newPost = new UserPost({
                text: req.body.text,
                name: user.name,
                user: req.user.id,
            });

            const post = await newPost.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error.");
        }
    }
);

// @route    GET posts/userPost
// @desc     Get all Users post
// @access   Private
router.get("/userPost", auth, async (req, res) => {
    try {
        // We are getting all the posts and also sorting them in latest order (if we want to get oldest first we can do date: 1)
        const posts = await UserPost.find().sort({ date: -1 });

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Company Post Routes

// @route    POST /posts/createCompanyPost
// @desc     Company Create a post
// @access   Private
router.post(
    "/createCompanyPost",
    [auth, body("text", "Text is required").not().isEmpty()],
    async (req, res) => {
        // Checking for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const company = await Company.findById(req.user.id).select("-password");

            const newPost = new CompanyPost({
                text: req.body.text,
                companyname: company.name,
                company: req.user.id,
            });

            const post = await newPost.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server error.");
        }
    }
);

// @route    GET posts/companyPost
// @desc     Get all Companies post
// @access   Private
router.get("/companyPost", auth, async (req, res) => {
    try {
        // We are getting all the posts and also sorting them in latest order (if we want to get oldest first we can do date: 1)
        const posts = await CompanyPost.find().sort({ date: -1 });

        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Common Posts routes

// @route    GET posts/:id
// @desc     Get user or company post by id
// @access   Private
router.get("/:id", auth, async (req, res) => {
    try {
        const userPost = await UserPost.findById(req.params.id);

        const companyPost = await CompanyPost.findById(req.params.id);

        if (!userPost && !companyPost) {
            res.status(404).send({ msg: "Post not found." });
        }

        if (!companyPost) res.json(userPost);
        else res.json(companyPost);
    } catch (err) {
        console.error(err.message);

        if (err.kind === "ObjectId") {
            res.status(404).send({ msg: "Post not found." });
        }

        res.status(500).send("Server Error");
    }
});


// @route    DELETE posts/:id
// @desc     Delete a user or company post by ID
// @access   Private
router.delete('/:id', auth, async (req, res) => {

    try {

        // We are getting all the posts and also sorting them in latest order (if we want to get oldest first we can do date: 1)
        const userPost = await UserPost.findById(req.params.id);

        const companyPost = await CompanyPost.findById(req.params.id);

        if (!userPost && !companyPost) {    // If post doesn't exist
            res.status(404).send({ msg: "Post not found." });
        }


        // Check on the user whether the user deleting the post is the owner of the post or not
        // Not an functionality in the frontend but someone can try using Postman or something else.
        // here post.user is an Object id it is not a string

        if (!companyPost) {
            if (userPost.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: "User not authorized. " });
            }
            userPost.remove();
        } else {
            if (companyPost.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: "User not authorized. " });
            }
            companyPost.remove();
        }

        res.json({ msg: "Post removed. " });

    } catch (err) {
        console.error(err.message);

        if (err.kind === 'ObjectId') {
            res.status(404).send({ msg: "Post not found." });
        }

        res.status(500).send("Server Error");
    }
});


// @route    PUT api/posts/like/:id
// @desc     Like a post
// @access   Private
// router.put('/like/:id', auth, async (req, res) => {

//     try {
//         const userPost = await UserPost.findById(req.params.id);

//         const companyPost = await CompanyPost.findById(req.params.id);

//         // Check if the post is already liked by the user or company that is calling this route
//         if (!companyPost) {
//             if (userPost.likes.filter(like => (like.user.toString() === req.user.id || like.company.toString == req.user.id)).length > 0) {
//                 return res.status(400).json({ msg: "Post is already liked." });
//             }
//         }

//          else {
//             if (companyPost.likes.filter(like => (like.user.toString() === req.user.id || like.company.toString == req.user.id)).length > 0) {
//                 return res.status(400).json({ msg: "Post is already liked." });
//         }
//     }

//         // post.likes.unshift({ user: req.user.id });

//         await post.save();

//         res.json(post.likes);

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error");
//     }
// })



module.exports = router;
