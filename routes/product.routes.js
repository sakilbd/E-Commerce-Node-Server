module.exports = (app) => {
    const products = require("../app/controllers/product.controller.js");
    var router = require("express").Router();
    var bodyParser = require("body-parser");
    var multer = require("multer"); //used for multipart form-data 
    var path = require('path');
    var express = require('express')


    //image upload middleWare 
    var storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/uploads')
        },
        filename: function(req, file, cb) {
            const name = file.originalname.split('.')[0];
            // const extension = MIME_TYPES[file.mimetype];
            cb(null, Date.now() + '_' + name + path.extname(file.originalname));
        }
    })
    var upload = multer({ storage: storage })

    //image upload middleWare ends
    // var upload = multer()


    // const upload = multer({
    //         limits: {
    //             fileSize: 1000000
    //         },
    //         fileFilter(req, file, cb) {
    //             if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    //                 return cb(new Error("please upload a valid image file"))
    //             }
    //             cb(undefined, true)
    //         }
    //     })
    // Create a new Tutorial
    router.post("/create", upload.single('image'), products.create);

    // Retrieve all Tutorials
    router.get("/get-all", products.findAll);


    // router.post('/upload', upload.single('image'), function(req, res, next) {
    //     // req.file is the `profile-file` file
    //     // req.body will hold the text fields, if there were any
    //     // console.log(JSON.stringify(req.file))
    //     // var response = '<a href="/">Home</a><br>'
    //     // response += "Files uploaded successfully.<br>"
    //     // response += `<img src="${req.file.path}" /><br>`
    //     res.send(req.file)
    // })


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

    // app.use(express.static(__dirname + '/public'));
    // app.use('/uploads', express.static('uploads'));



    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use("/api/products", router);
};