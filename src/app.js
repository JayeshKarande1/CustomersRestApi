
const express = require("express");
const app = express();
app.use(express.json());
const port=process.env.PORT||3001;
require("./db/conn")
const Contact=require("./models/contacts");

app.get("/",(req,res)=>
 {res.send("Hello from other side") }
)

// Create new records
    app.post("/contacts",(req,res)=> {
                                        console.log(req.body);
                                        const user= new Contact(req.body);

                                        // Save the data in Database                                      
                                        user.save().then(()=>{
                                                            res.status(200).send(user)
                                                        }).catch((e)=>{
                                                            res.status(401).send(e)
                                                        })
                                        
                                        
                                    }
            )

// Read records
    app.get("/contacts", async(req,res)=>
                {
                    try{
                    const ContactData = await Contact.find();
                    res.send(ContactData)
                    }
                    catch(e){
                        res.send(e)
                    }
                }
            )

// Read records by ID  
    app.get("/contacts/:id", async(req,res)=>{
                try{
                    const _id=req.params.id;
                    console.log("id is "+ _id);
                    const contact1 =await Contact.findById(_id);
                    //console.log(contact1);
                    res.send(contact1);
                }
                catch(e){
                    res.send("error is " +e)
                }
            }
        )

// Update records
    app.patch("/contacts/:id", async(req,res)=>{
            try{
                const _id=req.params.id;
                console.log("id is "+ _id);
                const contact1 =await Contact.findById(_id);

                console.log(contact1.phone);
                const phoneno_length = contact1.phone.toString().length;
                console.log("2 " +contact1.phone.toString().length);
                if(phoneno_length == 10)
                {
                    console.log("PHone is valid");
                    const contactUpdate =await Contact.findByIdAndUpdate(_id,req.body,{new:true});
                    //console.log(contact1);
                    res.send(contactUpdate);
                }
                else {
                    console.log("PHone is Not valid");
                    res.send("Please enter 10 digits only for Mobile Number");
                }


            }
            catch(e){
                res.status(404).send("error is " +e)
            }
        }
    )
    
// Delete records
    app.delete("/contacts/:id", async(req,res)=>{
        try{
        const _id=req.params.id;
        console.log("id is "+ _id);
        const deleteContact =await Contact.findByIdAndDelete(req.params.id);
        //console.log(contact1);
            if(!req.params.id){
                res.status("404").send();
            }
            console.log("* "+ deleteContact);
            res.send(deleteContact);
        }
        catch(e){
            res.status("500").send("error is " +e)
        }
    }
    )
  

app.listen(port,() => {
    console.log(`connection successfull at port ${port}`)
})
