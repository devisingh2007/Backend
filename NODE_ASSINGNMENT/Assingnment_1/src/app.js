const mongoose =require('mongoose');

const connectDB=async()=>
{
    try
{
await mongoose.connect(process.env.MONGO_URL);
console.log("mongoDB connected succesfully");
}
catch(err)
{
    console.log("not connected",err);
     
}}

module.exports=connectDB;