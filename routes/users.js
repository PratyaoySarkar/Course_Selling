const { Router } = require("express");
const bcrypt = require("bcrypt");
const z = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../config");
const { userModel } = require("../db");
const { purchaseModel, courseModel } = require("../db");
const userRouter = Router(); //The Router is the function not a class
const { userMiddleware } = require("../middleware/user");

userRouter.post("/signup", async function(req,res){
    const {email, password, firstName, LastName} = req.body;
    const emailSchema = z.string().min(5).max(30).email();
    const passwordSchema = z.string().min(8).max(30);

    try {
        emailSchema.parse(email);
        passwordSchema.parse(password);
    } catch (e) {
        return res.status(400).json({ message: "Invalid input Format!!" });
    }

    let errorThrown = false;
    try{
        const hashPassword = await bcrypt.hash(password, 5);
        console.log(hashPassword);

        await userModel.create({
            email,
            password: hashPassword,
            firstName,
            LastName
        });
    }
    catch(e){
        res.json({
            message: "This email is already in use"
        })
        errorThrown = true;
    }
    if(!errorThrown){
        res.json({
            message: "You have signed up successfully"
        })
    }
    else{
        res.json({
            message: "Sign up failed. Please try again"
        })
    }
    
})

userRouter.post("/signin", async function(req,res){
    //Input validation through zod
    const {email, password} = req.body;

    const user = await userModel.findOne({ //either user, or undefined
        email: email,
    });
    if(!user){
        res.status(403).json({
            message:"User doesn't exist!"
        })
        return
    }
    console.log(user);
    //Compare this password and the user.password in the database
    const passWordMatch = await bcrypt.compare(password, user.password)

    if(passWordMatch){
        const token = jwt.sign({
            id: user._id.toString() //As it is a speacial data type(Objectid), so we need to convert it to string
        },JWT_USER_SECRET);
        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
})

userRouter.get("/mypurchases", userMiddleware, async function(req, res){
    const userId = req.userId;

    const purchases = await purchaseModel.find({
        userId
    });
    const courseData = await courseModel.find({
        _id: { $in: purchases.map(x => x.courseId) }
    })
    res.json({
        purchases,
        courseData
    })
})


module.exports = {
    userRouter: userRouter
}