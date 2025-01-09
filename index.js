const express = require("express");
const {courseRouter} = require("./routes/course");
const {userRouter} = require("./routes/users");
const app = express();

app.use("/user", userRouter);
app.use("/course", courseRouter);

//createUserRouter(app);
//createCourseRouter(app);

app.listen(3000);