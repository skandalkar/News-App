
const mongoose = require('mongoose');
require ('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DBConnection_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Database connection established successfully!');
    }
    catch(error) {
        console.log("Database connection failed!, ",error);
        process.exit(1);
    }
} 

module.exports = connectDB;