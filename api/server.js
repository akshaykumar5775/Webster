const connectDB = require('./db/connection').default;
const express = require('express');

const app = express();

// Init Middleware
app.use(express.json({ extended: true }));

connectDB();

const PORT = process.env.PORT || 80;


app.get("/", (req, res) => {
    res.send("API Running");
    console.log("API is running");
})

// Define routes
app.use('/api/signUpUser', require('./routes/registerUser'));
app.use('/api/signUpCompany', require('./routes/registerCompany'));
app.use('/api/userAuth', require('./routes/userAuth'));
app.use('/api/companyAuth', require('./routes/companyAuth'));
app.use('/api/posts', require('./routes/posts'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/vacancy', require('./routes/vacancy'));


app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}.`);
})




