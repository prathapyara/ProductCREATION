import mongoose from "mongoose"
const Decimal128 = mongoose.Schema.Types.Decimal128;

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Decimal128,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
});

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }

})

export const Product=new mongoose.model("Product",productSchema);
export const User=new mongoose.model("User",userSchema);
