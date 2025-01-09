const {Router} = require("express");
const userRouter = Router(); //The Router is the function not a class

userRouter.post("/signup",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

userRouter.post("/signin",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

userRouter.get("/purchased",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})


module.exports = {
    userRouter: userRouter
}