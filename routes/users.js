const {Router} = require("express");
const { userModel } = require("../db");
const userRouter = Router(); //The Router is the function not a class

userRouter.post("/signup", async function(req,res){
    const {email, password, firstName, LastName} = req.body;
    email: z.string().min(5).max(30).email();
    password: z.string().min(8).max(30);

    let errorThrown = false;
    try{
        const hashPassword = await bcrypt.hash(password, 5);
        console.log(hashPassword);

        await userModel.create({
            email,
            password: hashPassword,
            firstName,
            LastName
        })

        res.json({
            message: "You are signed up seccessfully"
        })
    }
    catch(e){
        res.json({
            message: "Sign up failed. Please try again"
        })
    }
    
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