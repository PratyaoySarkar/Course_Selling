const express = require("express");
const mongoose = require("mongoose");

const {courseRouter} = require("./routes/course");
const {userRouter} = require("./routes/users");
const {adminRouter} = require("./routes/admin");
const app = express();

app.use("/user", userRouter); //Divide the routes into different files
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

//createUserRouter(app);
//createCourseRouter(app);

//Before listening to the port we should connect to the database, otherwise, the schema will not get updated to the database
async function connect(){
    await mongoose.connect("mongodb+srv://Pratyaoy:Pratyaoy%402003@cluster0.no3qq.mongodb.net/course_Selling");
    console.log("Connected to the database");
    app.listen(3000);
    console.log("Listening on port 3000");
}

connect();