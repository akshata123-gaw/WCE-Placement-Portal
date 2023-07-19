import mongoose from 'mongoose';


const userinfoSchema = new mongoose.Schema(
  {
    fname:String,
    lname:String,
    email:{type:String, unique: true },
    password:String,
    role: String,
  },
  {
    collection: "UserInfo",
  }
);


const UserInfo = mongoose.model("UserInfo", userinfoSchema);


export default UserInfo;