const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv');
const newsRoutes = require('./routes/newsRouter');


const summarizeRoute = require('./routes/summarize')

dotenv.config();
// connectDB();

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json());


//Routes
app.use('/api/news', newsRoutes);

// for summarization
app.use('/api/summarize', summarizeRoute);

//Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
