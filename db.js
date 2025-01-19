const mongoose  = require('mongoose');
//We should not connect the database here because it will be connected in the index.js file
//mongoose.connect("mongodb+srv://Pratyaoy:Pratyaoy%402003@cluster0.no3qq.mongodb.net/course_Selling")
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

//Schema is a class in mongoose which is used to define the structure of the document
const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : String,
    firstName : String,
    LastName : String,
});

const adminSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : String,
    firstName : String,
    LastName : String,
});

const courseSchema = new Schema({
    title : String,
    description : String,
    price : Number,
    imageURL  : String,
    creatorId: ObjectId,
});

const purchaseSchema = new Schema({
    userId : ObjectId,
    courseId : ObjectId,
});

const userModel = mongoose.model('User', userSchema);
const adminModel = mongoose.model('Admin', adminSchema);
const courseModel = mongoose.model('Course', courseSchema);
const purchaseModel = mongoose.model('Purchase', purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}
