const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const UserProfile = require('../models/UserProfile');
const CompanyProfile = require('../models/CompanyProfile');
const User = require('../models/User');
const Company = require('../models/Company')

// @route    GET /api/profile/user/me
// @desc     Get current user profile
// @access   Private
router.get('/user/me', auth, async (req, res) => {

    try {

        // Here we are finding a profile on the basis of user field that we have in the Profile Schema
        // that is ref. to User Schema and also we are populating the fields that we want to use.
        const userProfile = await UserProfile.findOne({ user: req.user.id }).populate('user', ['name']);

        if (!userProfile) {
            return res.status(400).json({ msg: "There is no profile for this user." });
        }

        res.json(userProfile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

// @route    GET /api/profile/company/me
// @desc     Get current company profile
// @access   Private
router.get('/company/me', auth, async (req, res) => {

    try {

        // Here we are finding a profile on the basis of user field that we have in the Profile Schema
        // that is ref. to User Schema and also we are populating the fields that we want to use.
        const companyProfile = await CompanyProfile.findOne({ company: req.user.id }).populate('company', ["companyname"]);

        if (!companyProfile) {
            return res.status(400).json({ msg: "There is no profile for this company." });
        }

        res.json(companyProfile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})


// @route    POST /api/profile/user
// @desc     Create or update a user profile
// @access   Private
router.post('/user', [auth,
    body('status', 'Status is required').not().isEmpty(),
    body('skills', 'Skills is required').not().isEmpty(),
    body('resumelink', 'Resume Link is required').not().isEmpty(),
],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            location,
            bio,
            status,
            resumelink,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;


        // Build profile Object
        const profileFields = {};
        profileFields.user = req.user.id;
        if (resumelink) profileFields.resumelink = resumelink;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = (skills.toString()).split(',').map(skill => skill.trim());
        }


        // Build social object

        profileFields.social = {};
        if (twitter) profileFields.social.twitter = twitter;
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;


        // Since we are using async and await and mongoose always returns a promise hence we have to use await before every mongoose query
        try {

            let userProfile = await UserProfile.findOne({ user: req.user.id });

            if (userProfile) {
                // Update

                userProfile = await UserProfile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(userProfile);
            }

            // Create
            userProfile = new UserProfile(profileFields);

            await userProfile.save();

            res.json(userProfile);


        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })



// @route    POST /api/profile/company
// @desc     Create or update a company profile
// @access   Private
router.post('/company', [auth,
    body('website', 'Website name is required').not().isEmpty(),
    body('headquarters', 'Headquartersis required').not().isEmpty(),
    body('services', 'Services is required').not().isEmpty(),
],
    async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const {
            companyname,
            website,
            about,
            headquarters,
            services,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        const company = await Company.findById(req.user.id);

        // Build profile Object
        const profileFields = {};
        profileFields.companyname = company.companyname;
        profileFields.company = req.user.id;
        profileFields.website = website;
        profileFields.headquarters = headquarters;
        if (about) profileFields.about = about;
        if (services) {
            profileFields.services = (services.toString()).split(',').map(service => service.trim());
        }


        // Build social object
        profileFields.social = {};
        if (twitter) profileFields.social.twitter = twitter;
        if (youtube) profileFields.social.youtube = youtube;
        if (facebook) profileFields.social.facebook = facebook;
        if (instagram) profileFields.social.instagram = instagram;
        if (linkedin) profileFields.social.linkedin = linkedin;


        // Since we are using async and await and mongoose always returns a promise hence we have to use await before every mongoose query
        try {

            let companyProfile = await CompanyProfile.findOne({ company: req.user.id });

            if (companyProfile) {
                // Update
                companyProfile = await CompanyProfile.findOneAndUpdate(
                    { company: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(companyProfile);
            }

            // Create
            companyProfile = new CompanyProfile(profileFields);

            await companyProfile.save();

            res.json(companyProfile);


        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    })


// @route    GET /api/profile/user
// @desc     Get all Users profiles
// @access   Public
router.get('/user', async (req, res) => {

    try {

        const profiles = await UserProfile.find().populate('user', ['name']);
        res.json(profiles);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error.");
    }
});

// @route    GET api/profile/company
// @desc     Get all Company profiles
// @access   Public
router.get('/company', async (req, res) => {

    try {

        const profiles = await CompanyProfile.find().populate('company', ['companyname']);
        res.json(profiles);

    } catch (err) {
        console.log(err.message);
        res.status(500).send("Server error.");
    }
});


// @route    GET /profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {

    try {

        const userProfile = await UserProfile.findOne({ user: req.params.user_id }).populate('user', ['name']);

        if (!userProfile) {
            return res.status(400).json({ msg: "User Profile not found." })
        }

        res.json(userProfile);

    } catch (err) {
        console.log(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "User Profile not found." })
        }

        res.status(500).send("Server error.");
    }
})

// @route    GET /profile/company/:company_id
// @desc     Get profile by company ID
// @access   Public
router.get('/company/:company_id', async (req, res) => {

    try {

        const companyProfile = await CompanyProfile.findOne({ company: req.params.company_id }).populate('company', ['companyname']);

        if (!companyProfile) {
            return res.status(400).json({ msg: "Company Profile not found." })
        }

        res.json(companyProfile);

    } catch (err) {
        console.log(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "Company Profile not found." })
        }

        res.status(500).send("Server error.");
    }
})


// @route    DELETE /api/profile/user
// @desc     Delete user, its profile and posts
// @access   Private
router.delete('/user', auth, async (req, res) => {

    try {

        // Remove all posts of user
        // await UserPost.deleteMany({ user: req.user.id });
        // Remove profile
        await UserProfile.findOneAndRemove({ user: req.user.id });
        // Remove user
        await User.findByIdAndRemove({ _id: req.user.id });

        res.json({ msg: "User deleted." });

    } catch (err) {
        console.log(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "User Profile not found." })
        }

        res.status(500).send("Server error.");
    }
})

// @route    DELETE /api/profile/company
// @desc     Delete company, its profile and its posts
// @access   Private
router.delete('/company', auth, async (req, res) => {

    try {

        // Remove all posts of company
        // await CompanyPost.deleteMany({ company: req.user.id });
        // Remove profile of company
        await CompanyProfile.findOneAndRemove({ company: req.user.id });
        // Remove company
        await Company.findByIdAndRemove({ _id: req.user.id });

        res.json({ msg: "Company deleted." });

    } catch (err) {
        console.log(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "Company Profile not found." })
        }

        res.status(500).send("Server error.");
    }
})


// @route    PUT /api/profile/user/experience
// @desc     Add User experience
// @access   Private
router.put('/user/experience', [auth,
    body('title', 'Title is required').not().isEmpty(),
    body('company', 'Company is required').not().isEmpty(),
    body('from', 'From date is required').not().isEmpty(),

], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    // Here creating a object with above destructured data
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {

        const userProfile = await UserProfile.findOne({ user: req.user.id });

        // experience is an array and we are pushing new data into beginning using unshift function
        userProfile.experience.unshift(newExp);

        await userProfile.save();

        res.json(userProfile);

    } catch (err) {
        console.log(err.message);

        res.status(500).send("Server error.");
    }
})


// @route    DELETE /api/profile/user/experience/:exp_id
// @desc     Delete experience from User profile
// @access   Private
router.delete('/user/experience/:exp_id', auth, async (req, res) => {
    try {

        const userProfile = await UserProfile.findOne({ user: req.user.id });

        

        // Get remove index
        const removeIndex = userProfile.experience.map(item => item.id).indexOf(req.params.exp_id);

        userProfile.experience.splice(removeIndex, 1);

        await userProfile.save();

        res.json(userProfile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error.");
    }
})


// @route    PUT /api/profile/user/education
// @desc     Add User education
// @access   Private
router.put('/user/education', [auth,
    body('school', 'School is required').not().isEmpty(),
    body('degree', 'Degree is required').not().isEmpty(),
    body('fieldofstudy', 'Field of study date is required').not().isEmpty(),
    body('from', 'From date is required').not().isEmpty(),

], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Destruturing
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    // Here creating a object with above destructured data
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {

        const userProfile = await UserProfile.findOne({ user: req.user.id });

        // experience is an array and we are pushing new data into beginning using unshift function
        userProfile.education.unshift(newEdu);

        await userProfile.save();

        res.json(userProfile);

    } catch (err) {
        console.log(err.message);

        res.status(500).send("Server error.");
    }
})


// @route    DELETE /api/profile/user/education/:edu_id
// @desc     Delete education from user profile by education object id
// @access   Private
router.delete('/user/education/:edu_id', auth, async (req, res) => {
    try {

        const userProfile = await UserProfile.findOne({ user: req.user.id });

        // Get remove index
        const removeIndex = userProfile.education.map(item => item.id).indexOf(req.params.edu_id);

        userProfile.education.splice(removeIndex, 1);

        await userProfile.save();

        res.json(userProfile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error.");
    }
})


module.exports = router;