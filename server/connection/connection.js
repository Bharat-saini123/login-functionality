import mongoose from "mongoose";

const ConnectionFunction=async()=>{
await mongoose.connect("mongodb://127.0.0.1:27017/abd").then(()=>{
    console.log("connect hai yaar");
}).catch(()=>{
    console.log("connect nahi hai karna padega");
});
}


export default ConnectionFunction;