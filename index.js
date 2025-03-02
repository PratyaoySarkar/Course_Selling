require('dotenv').config();
console.log(process.env.MONGO_URI);
const express = require("express");
const mongoose = require("mongoose");

const { courseRouter } = require("./routes/course");
const { userRouter } = require("./routes/users");
const { adminRouter } = require("./routes/admin");
const app = express();
app.use(express.json()); //To parse the body of the request

app.use("/user", userRouter); //Divide the routes into different files
app.use("/course", courseRouter);
app.use("/admin", adminRouter);

//createUserRouter(app);
//createCourseRouter(app);

//Before listening to the port we should connect to the database, otherwise, the schema will not get updated to the database
async function connectDB(){
    await mongoose.connect(process.env.MONGO_URI); //, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true
    // })
    // .then(() => console.log("Connected to MongoDB"))
    // .catch(err => console.error("MongoDB Connection Error:", err));
    console.log("Connected to the database");
    app.listen(3000);
    console.log("Listening on port 3000");
}

connectDB();