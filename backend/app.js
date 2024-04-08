const express = require("express")
const mongoose = require("mongoose")
const cors =require("cors")
const bcrypt = require("bcrypt")
const jwt =require("jsonwebtoken")
const multer =require("multer");


const app = express()

app.use(cors({
    origin:true
}))

app.use(express.json())

//  ...create static image..
 app.use("/upload",express.static("upload"))

//    ..create multer..
const imgupload = multer({
    storage:multer.diskStorage({
        destination:(req,file,cb)=>{
            cb(null,'upload/');
        },
        filename:(req,file,cb)=>{
            cb(null,Date.now()+"-"+file.originalname)
        }
    })
})
   console.log(Date.now());

   //..create a middleware set...
   app.post("/uploadfile",imgupload.single("file"),(req,res)=>{
    console.log(req.file);
    res.send("upload image success")
   })




app.get("/",(req,res)=>{
    res.send("heloo")
})

app.post("/",(req,res)=>{

    const { name,email,password } = req.body

    console.log(email);

    res.send(req.body)

})

const userSchema = new mongoose.Schema({

    name:{type:String},

    email:{type:String},

   password:{type:String},

   Profile_image:{type:String}

})
const User = mongoose.model("USER", userSchema)

app.post("/Registration",imgupload.single("file"),(req,res) =>{
    console.log(req.file);

 User.findOne({ email:req.body.emil}).then((user_present)=>{

    console.log(user_present);

    if (user_present){
        res.send("user alredy presend")

    } else {

        bcrypt.hash(req.body.password,10).then((hashedPassword)=>{

      console.log(hashedPassword);

      if (hashedPassword){

     const table = User({

        name:req.body.name,
        email:req.body.email,
        password:hashedPassword, 
        Profile_image:req.file.path

    })

    table.save().then(()=>{
        res.send("saved success")
    }
    ).catch((err)=>{
        res.send("failed")
    })
}
        }).catch(err=>{
            res.send("cannot hash password")
        })
    }
 })
})


  app.post("/login",(req,res)=>{
    User.findOne({email:req.body.email}).then((user_present)=>{

        console.log(user_present);
        console.log(req.body);
        if(user_present){

            bcrypt.compare(req.body.password,user_present.password,
                (err,result)=>{
  if(err){

    res.send("error on comparing passwords")

     } else {
        console.log(result);
   
    if(result){
        const token= jwt.sign(req.body.email,"amaya")
        console.log(token);
        res.send({token :token,msg:"Login success"})
    }else{

         res.send({token:null,msg:"login not success"})

        //  res.status(400).send("not matching")
    }
 }
   })   
    } else {

    res.send({token:null,msg:"login not success"})
    // res.status(400).send("login not success")

    }
  }).catch(err =>{

    res.send({token:null,msg:"something went wrong"})
    // res.status(500).send("something went wrorng")
  })
  })
 app.post("/getUser",(req,res) =>{
 const token = req.body.token;


 jwt.verify(token,"amaya",(err,decoded)=>{
    if(err){
        res.send("jwt verification failed")
    }else{

        console.log(decoded);

        User.findOne({email:decoded}).then(user_present =>{
        console.log(user_present);
        res.send(user_present)
        })
    }
})
})


const rideschema =new mongoose.Schema({

    ridename:{type:String},
    ridedesc:{type:String},
    rideimg:{type:String},

})

const Ride = mongoose.model("RIDE",rideschema)

  app.post("/addride",imgupload.single("rideimage"),
  (req,res)=>{
    console.log(req.body);
    console.log(req.file);

    const ride =Ride({
         ridename:req.body.ridename,
         ridedesc:req.body.ridedesc,
         rideimg :req.file.path
     })

     ride.save().then(()=>{
        res.send("ride add success")
     }).catch(err =>{
        res.send(err)
     })
     })
 
app.post("/viewride",(req,res)=>{
   Ride.find().then(ride_output=>{
        res.send(ride_output)
    }).catch(err=>{
        res.send(err)
    })
})


//view ride with rideid
app.post("/ride_with_id/:id",(req,res)=>{
    const id= req.params.id
    Ride.findById({_id:id})
    .then(ride_output=>{
        res.send(ride_output)
    }).catch(err=>{
        res.send(err)
    })
})

    // ..create add feddback..
    
const feedbackschema =new mongoose.Schema({

    feedbackname:{type:String},
    feedbackdesc:{type:String},
   ride_id:{type:String},
   ride_name:{type:String},
   verify:{type:Boolean,default:false},
   date:{type:Date,default:Date.now}
});

const Feedback = mongoose.model("FEEDBACK",feedbackschema)


app.post('/addfeedback', async (req, res) => {
    try {
        const { feedbackname, feedbackdesc, ride_id, ride_name } = req.body;

        console.log(req.body);

        const feedback = new Feedback({ feedbackname, feedbackdesc, ride_id, ride_name });
        await feedback.save();
        res.status(201).json({ message: 'Feedback added successfully', feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post("/viewfeedback/:rideid",(req,res)=>{
   Feedback.find({ride_id:req.params.rideid}).then(feedback_output=>{
    console.log(feedback_output);
         res.send(feedback_output)
     }).catch(err=>{
         console.log("jjjjjjj");
         res.send(err)

     })
 })







  mongoose.connect("mongodb+srv://amayadevu:hUFSGjdYorO2ncJo@cluster0.b132uqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0 ").then(()=>{
    console.log("database coonected");
 }).catch((err)=>{
    console.log("not coonected",err);
})

  app.listen(7000,()=>{
    console.log("server listen at port 7000");
})
