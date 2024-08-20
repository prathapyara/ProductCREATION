import mongoose from "mongoose";

const uri = 'mongodb+srv://prathapyara:IeS6yhv1yXIEDFh9@test.vldqk8q.mongodb.net/TestDatabase?retryWrites=true&w=majority&appName=Test';

export const mongoDB=async()=>{
  try{
    const data=await mongoose.connect(uri,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to the mongodb")
  }catch(err){
    console.log(err);
  }
}