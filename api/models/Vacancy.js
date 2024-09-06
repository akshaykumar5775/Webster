const mongoose = require('mongoose');

const Vacancy = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    companyname: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    joblocation: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userapplied : [
        {
            userprofile: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'userprofile'
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    },
    closed: {
        type: Boolean,
        default: false 
    }
});


const vacancy = mongoose.model('vacancy', Vacancy);
module.exports = vacancy;