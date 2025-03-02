const { Router } = require("express");
const adminRouter = Router(); //The Router is the function not a class
const { adminModel, courseModel } = require("../db");
//bcrypt is used to hash the password
//jsonwebtoken is used to create the token
//zod is used to validate the schema
const { z } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_Admin_SECRET } = require("../config");//If by very low chance, the user and the admin having same objectId
//are also having same email and password, then also the token will not be same, as the secret key is different for both
const { adminMiddleware } = require("../middleware/admin");

adminRouter.post("/signup", async function(req, res) {
    const { email, password, firstName, LastName } = req.body;
    const emailSchema = z.string().min(5).max(30).email();
    const passwordSchema = z.string().min(8).max(30);

    try {
        emailSchema.parse(email);
        passwordSchema.parse(password);
    } catch (e) {
        return res.status(400).json({ message: "Invalid input format!!" });
    }

    try{
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: "This email is already in use" });
        }
        const hashPassword = await bcrypt.hash(password, 5);
        console.log(hashPassword);

        await adminModel.create({
            email,
            password: hashPassword,
            firstName,
            LastName
        });

        res.json({message: "You have signed up successfully"});
    }
    catch(e){
        console.error("Signup Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    // await adminModel.create({
    //     email: email,
    //     password: password,
    //     firstName: firstName, 
    //     LastName: LastName
    // })
    
    // res.json({
    //     message: "Signup succeeded"
    // })
    
});

adminRouter.post("/signin", async function(req, res) {
    const { email, password } = req.body;

    try{
        const admin = await adminModel.findOne({ email });//either admin, or undefined
        
        if(!admin){
            res.status(403).json({
                message:"Admin doesn't exist!"
            })
            return
        }
        console.log(admin);
        //Compare this password and the admin.password in the database
        const passWordMatch = await bcrypt.compare(password, admin.password);

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
            });
        }
    }catch(e){
        console.error("Signin Error:", e);
        res.status(500).json({ message: "Internal Server Error" });
    }
    // const admin = await adminModel.findOne({
    //     email: email,
    //     password: password
    // });

    // if (admin) {
    //     const token = jwt.sign({
    //         id: admin._id
    //     }, JWT_Admin_SECRET);

    //     // Do cookie logic

    //     res.json({
    //         token: token
    //     })
    // } else {
    //     res.status(403).json({
    //         message: "Incorrect credentials"
    //     })
    // }
});

//adminRouter.use(adminMiddleware); //Middleware for admin after signup or signin

adminRouter.post("/create-course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    const { title, description, price, imageURL } = req.body;

    try{ 
        const course = await courseModel.create({
            title,
            description,
            price,
            imageURL,
            creatorId : adminId
        });
        res.json({
            message: "Course created successfully",
            courseId: course._id //Speciefic object id in database for this course
        })
    } catch(e) {
        res.json({
            message: "Course creation failed"
        });//"courseId": "67c49b3a836aa5344a767d4e"
    }
})

adminRouter.put("/update-course", adminMiddleware, async function(req, res) {
    const adminId = req.userId;
    const { title, description, price, imageURL, courseId } = req.body;

    try{
        const course = await courseModel.updateOne({//To update speciefic row in the database
            _id: courseId,
            creatorId: adminId //To check if the course is created by the same admin
        },{
            title,
            description,
            price,
            imageURL
        });
        res.json({
            message: "Course updated successfully",
            courseId: course._id //Speciefic object id in database for this course
        });
    }catch(e){
        res.json({
            message: "Course updation failed"
        });
    }
});

adminRouter.get("/course/bulk", adminMiddleware, async function(req, res) {
    const adminId = req.userId;

    try{
        const courses = await courseModel.find({
            creatorId: adminId
        });

        res.json({
            message : "Courses fetched successfully",
            courses
        });
    }catch(e){
        res.json({
            message: "Courses fetching failed"
        });
    }
})

module.exports = {
    adminRouter: adminRouter
}