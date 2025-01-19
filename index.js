const express = require("express");
const {courseRouter} = require("./routes/course");
const {userRouter} = require("./routes/users");
const {admitRouter} = require("./routes/admin");
const app = express();

app.use("/user", userRouter); //Divide the routes into different files
app.use("/course", courseRouter);
app.use("/admin", admitRouter);

//createUserRouter(app);
//createCourseRouter(app);

app.listen(3000);