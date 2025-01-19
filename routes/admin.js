const { Router } = require("express");
const adminRouter = Router(); //The Router is the function not a class
const { adminModel } = require("../db");

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