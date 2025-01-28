const {Router} = require("express");
const bcrypt = require("bcrypt");
const z = require("zod");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ilovekiara"; 
const { userModel } = require("../db");
const userRouter = Router(); //The Router is the function not a class

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
        },JWT_SECRET);
        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
})

userRouter.get("/purchased",function(req,res){
    res.json({
        message: "signup endpoint"
    })
})


module.exports = {
    userRouter: userRouter
}