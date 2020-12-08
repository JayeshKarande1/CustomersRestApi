const mongoose=require("mongoose");
const { default: validator } = require("validator");
const validate=require("validator");

const contactschema=new mongoose.Schema({
        _id: {
                type: Number,
                required: [true, 'Id is required']
              },
        name: {
                type: String,
                minlength:3,
                required: [true, 'Why no Name?']
              },
       phone: {
        type: Number,
        //minlength: 10,
        maxlength: 10,
         required: [true, 'Mobile number is Mandatory']
       },
        email: {
          type: String,
          required:true,
          unique: [true," email is required"],
          validate(value){
                  if(!validator.isEmail(value)){
                        throw new Error("Invalid Email")
                  }
          }

          }
        }
      );

const Contact =new mongoose.model('Contact',contactschema);

module.exports = Contact;