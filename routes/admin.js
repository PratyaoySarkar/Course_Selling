const { Router } = require("express");
const adminRouter = Router(); //The Router is the function not a class
const { adminModel } = require("../db");
//bcrypt is used to hash the password
//jsonwebtoken is used to create the token
//zod is used to validate the schema
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_Admin_SECRET = "ilovecoding";//If by very low chance, the user and the admin having same objectId
//are also having same email and password, then also the token will not be same, as the secret key is different for both

adminRouter.post("/signup", async function (req, res) {
    const {email, password, firstName, LastName} = req.body;
    const emailSchema = z.string().min(5).max(30).email();
    const passwordSchema = z.string().min(8).max(30);

    try {
        emailSchema.parse(email);
        passwordSchema.parse(password);
    } catch (e) {
        return res.status(400).json({ message: "Invalid input format!!" });
    }

    let errorThrown = false;
    try{
        const hashPassword = await bcrypt.hash(password, 5);
        console.log(hashPassword);

        await adminModel.create({
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

adminRouter.post("/signin", async function (req, res) {
    const {email, password} = req.body;

    const admin = await adminModel.findOne({ //either admin, or undefined
        email: email,
    });
    if(!admin){
        res.status(403).json({
            message:"Admin doesn't exist!"
        })
        return
    }
    console.log(admin);
    //Compare this password and the admin.password in the database
    const passWordMatch = await bcrypt.compare(password, admin.password)

    if(passWordMatch){
        const token = jwt.sign({
            id: admin._id.toString() //As it is a speacial data type(Objectid), so we need to convert it to string
        },JWT_Admin_SECRET);
        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            message:"Incorrect credentials"
        })
    }
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