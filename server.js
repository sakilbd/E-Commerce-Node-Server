const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();


require("./routes/product.routes")(app);
var corsOptions = {
    origin: "127.0.0.1"
};

app.use(cors(corsOptions));

// http://127.0.0.1:3000/public/uploads/about_me1665134062193..PNG
app.use('/public', express.static('public'))
app.use(express.static('public'))
app.use(express.static('files'))
    // used to access everthing publicly from public folder with route "/public" as given example 


// parse requests of content-type - application/json
// app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: true }));


// simple route
app.get("/", (req, res) => {
    res.json({ message: "Server Final Test v0.1" });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});