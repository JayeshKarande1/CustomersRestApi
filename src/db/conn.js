const mongoose=require("mongoose");

mongoose.connect(" mongodb://127.0.0.1:27017/customers",{
    useUnifiedTopology:true,
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
}).then(()=> {
    console.log("DB Connection successfull")
}

).catch((e)=>{
    console.log("Connection failed")
})