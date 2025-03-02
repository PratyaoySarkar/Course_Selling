const { Router } = require("express");
const courseRouter = Router(); //The Router is the function not a class

courseRouter.post("purchase", function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

courseRouter.get("/preview", function(req,res){
    res.json({
        message: "signup endpoint"
    })
})


module.exports = {
    courseRouter: courseRouter
}