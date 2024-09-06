const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    companyname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})


const Company = mongoose.model('company', CompanySchema);
module.exports = Company;