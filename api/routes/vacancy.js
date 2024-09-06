const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const UserProfile = require('../models/UserProfile');
const Vacancy = require('../models/Vacancy');
const Company = require('../models/Company');
const User = require('../models/User');

// This is for companies to see its created vacancies
// @route    GET api/vacancy/company/me
// @desc     Get current vacancies created by company
// @access   Private
router.get('/company/me', auth, async (req, res) => {

    try {

        const company = await Company.findById(req.user.id);

        if (!company) {
            return res.status(404).json({ msg: "Page Not Found." });
        }

        const vacancies = await Vacancy.find({ company: req.user.id });

        if (vacancies === null) {
            return res.status(400).json({ msg: "There is no vacancy created by company. " });
        }

        res.json(vacancies);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// This is for users to see all vacancies from all companies
// @route    GET api/vacancy/
// @desc     Get all vacancies
// @access   Private
router.get('/', auth, async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: "Page Not Found." });
        }

        // We are getting all the posts and also sorting them in latest order (if we want to get oldest first we can do date: 1)
        const vacancies = await Vacancy.find().sort({ date: -1 });

        res.json(vacancies);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }

})


// @route    POST api/vacancy/
// @desc     Post new vacancies created by company
// @access   Private
router.post('/', [auth,
    body('title', 'Title is required.').not().isEmpty(),
    body('joblocation', 'Job Location is required.').not().isEmpty(),
    body('description', 'Description is required.')


], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const company = await Company.findById(req.user.id).select('-password');

    const {
        title,
        joblocation,
        description
    } = req.body;

    try {
        // Creation of vacancy
        const vacancy = new Vacancy({
            title: title,
            joblocation: joblocation,
            description: description,
            companyname: company.companyname,
            company: req.user.id
        });

        await vacancy.save();

        res.json(vacancy);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// Company who has created the vacancy will delete that vacancy
// @route    DELETE api/vacancy/:vacancy_id
// @desc     Delete vacancy by ID
// @access   Private
router.delete('/:vacancy_id', auth, async (req, res) => {

    try {
        const vacancy = await Vacancy.findById(req.params.vacancy_id);

        if (!vacancy) {
            res.status(404).send({ msg: "Vacancy not found." });
        }

        // Checking if company who has created this vacancy is same as the deleting one.
        if (vacancy.company.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized." });
        }

        await vacancy.remove();

        res.json({ msg: "Vacancy deleted." });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            res.status(404).send({ msg: "Vacancy not found." });
        }
        res.status(500).send("Server Error");
    }
})



// @route    GET api/vacancy/:vacancy_id
// @desc     Get vacancy by its ID
// @access   Private
router.get('/:vacancy_id', auth, async (req, res) => {

    try {

        const vacancy = await Vacancy.findById(req.params.vacancy_id).populate('company', ['companyname']);

        const user = await User.findById(req.user.id);

        if (!user && vacancy.company._id.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Unauthorized." });
        }

        if (!vacancy) {
            return res.status(404).json({ msg: "Vacancy not found." });
        }

        res.json(vacancy);

    } catch (err) {
        console.log(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: "User Profile not found." })
        }

        res.status(500).send("Server error.");
    }
});


// @route    PUT api/vacancy/:vacancy_id
// @desc     Currently only using this route to update the close field of a vacancy
// @access   Private
router.put('/:vacancy_id', auth, async (req, res) => {
    try {
        var vacancy = await Vacancy.findById(req.params.vacancy_id);

        if (!vacancy) {
            res.status(404).send({ msg: "Vacancy not found." });
        }

        // Checking if company who has created this vacancy is same as the closing it.
        if (vacancy.company.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized." });
        }

        // Update vacancy
        vacancy = await Vacancy.findOneAndUpdate({ _id: req.params.vacancy_id }, { closed: req.body.closed }, { new: true });

        // res.json(vacancy);
        res.json({ msg: "Vacancy is closed." })

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            res.status(404).send({ msg: "Vacancy not found." });
        }
        res.status(500).send("Server Error");
    }
});


// @route    PUT api/vacancy/user/:vacancy_id
// @desc     For Users to apply or unapply
// @access   Private
router.put('/user/:vacancy_id', auth, async (req, res) => {

    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            res.status(401).json({ msg: "Login as user first." });
        }

        const userProfile = await UserProfile.findOne({ user: req.user.id });

        if (!userProfile) {
            return res.status(404).json({ msg: "There is no user profile. First create one." });
        }

        const vacancy = await Vacancy.findById(req.params.vacancy_id);

        
        const currentUser = vacancy.userapplied.filter(
            profile => {
                return (profile.userprofile.toString() === userProfile._id.toString())
            });

        if (currentUser.length === 0) {
            vacancy.userapplied.unshift({ userprofile: userProfile._id });

            
        }   else {
            // Get remove Index
            const removeIndex = vacancy.userapplied.map(profile => profile.userprofile.toString()).indexOf(userProfile._id.toString());

            vacancy.userapplied.splice(removeIndex, 1);
        }
        
        await vacancy.save();
        res.json(vacancy.userapplied);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;


