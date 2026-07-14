const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const connectDB = require('./config/dbConnection');
const newsRoutes = require('./routes/newsRouter');

const summarizeRoute = require('./routes/summarize') // summarization endpoint
const validateRoute = require('./routes/validation') // validation endpoint

const authRoutes = require('./routes/User.auth.route')
const otpRoutes = require('./routes/OTP.route')

const fetchNewsRoute = require('./routes/fetchNewsRoute'); //News fetching

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());

// Routes
// Home API endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Briefly - Your Daily News Digest');
});

// Use the authentication routes
app.use('/api/v1/auth', authRoutes);

// OTP process routes for send, verify and resend 
app.use('/api/v1/otp', otpRoutes);

//news route
app.use('/fetch-news', fetchNewsRoute);

app.use('/api/news', newsRoutes);

// for summarization
app.use('/api/summarize', summarizeRoute); // summarization endpoint

// for validation
app.use('/api/validate', validateRoute); // validation endpoint

//Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})