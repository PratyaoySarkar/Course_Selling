const { Router } = require("express");
const adminRouter = Router(); //The Router is the function not a class
const { adminModel } = require("../db");
//bcrypt is used to hash the password
//jsonwebtoken is used to create the token
//zod is used to validate the schema
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ilovecoding";

adminRouter.post("/signup", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get("/signin", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

//adminRouter.use(adminMiddleware); //Middleware for admin after signup or signin

adminRouter.post("/create-course", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.put("/update-course", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get("/course/bulk", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}