
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

app.get('/', (request, response) => {
    response.send("Home Page - Welcome to the Server!");
})

app.listen(port, () =>{
    console.log('Server is running on port ',port);
})