module.exports = (app) => {
    const products = require("../app/controllers/product.controller.js");
    var router = require("express").Router();
    var bodyParser = require("body-parser");
    var multer = require("multer"); //used for form-data 
    var upload = multer(); //used for form-data

    // Create a new Tutorial
    router.post("/create", products.create);

    // Retrieve all Tutorials
    router.get("/get-all", products.findAll);

    // // Retrieve all published Tutorials
    // router.get("/published", tutorials.findAllPublished);

    // // Retrieve a single Tutorial with id
    // router.get("/:id", tutorials.findOne);

    // // Update a Tutorial with id
    // router.put("/:id", tutorials.update);

    // // Delete a Tutorial with id
    // router.delete("/:id", tutorials.delete);

    // // Delete all Tutorials
    // router.delete("/", tutorials.deleteAll);


    app.use(upload.array()); //used for form-data
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api/products", router);
};