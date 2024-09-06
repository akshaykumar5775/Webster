const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    companyname: {
        type: String
    },
    website: {
        type: String,
        required: true
    },
    headquarters: {
        type: String,
        required: true
    },
    services: {
        type: [String]
    },
    about: {
        type: String
    },
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


const companyProfile = mongoose.model('companyprofile', CompanySchema);
module.exports = companyProfile;