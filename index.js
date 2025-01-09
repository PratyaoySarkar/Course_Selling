const express = require("express");
const app = express();

app.post("/user/signup",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

app.post("/user/signin",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

app.get("/user/purchased",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

app.post("/course/purchase",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

app.get("/courses",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})

app.listen(3000);