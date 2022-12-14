const model = require("../../models");
const Products = model.products;
const Op = model.Sequelize.Op;
const multer = require("multer");
const fs = require("fs");
require('dotenv').config();
const apiResponser = require('../helpers/api.responser')

// Create and Save a new Tutorial
exports.create = (req, res) => {
    // res.send(req.file);
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
        return;
    }
    // Create a Tutorial
    const product = {
        catagory_id: req.body.catagory_id,
        title: req.body.title,
        image: req.file.filename,
        price: req.body.price,
        quantity: req.body.quantity,
        unit_amount: req.body.unit_amount,
        unit: req.body.unit,
        rating: req.body.rating,
    };

    // Save Tutorial in the database
    Products.create(product)
        .then((data) => {
            res.send(apiResponser.sucessResponse(200, 'Product Added Successfully', data));
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating Product",
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    Products.findAll()
        .then(data => {
            data.forEach(item => {
                item.image = process.env.APP_URL + "/public/uploads/" + item.image;
            })
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {};