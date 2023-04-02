require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const _ = require('lodash');
const ejs = require('ejs')
const multer = require('multer');

 ////////////////////////////////////////////// node mailer set up //////////////////////////////////////////////
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'unnitestone@gmail.com',
        pass:process.env.PASSWORD
    }
});



const mongoose = require("mongoose");
const res = require('express/lib/response');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/ojilStore",{useNewUrlParser:true}).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log("Connection error : "+err);
});

// user schema
const staffSchema = new mongoose.Schema({
    firstname:String,
    lastname:String,
    phoneNo : String,
    email:String,
    username:String,
    password:String

})

const Staff = mongoose.model('staff',staffSchema);

const userSchema= new mongoose.Schema({
    data:{},
    file_name:[]
})

//model

const User = mongoose.model("user",userSchema)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload/')
     
    },
    filename: function (req, file, cb) {
    cb(null,Date.now()+".png") //Appending .jpg
    }
  })
const upload = multer({storage:storage})

const db =[]

let Data ={
   
}


const app = express();
app.set("view engine",'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))


////////////////////////////////////////////// Home //////////////////////////////////////////////

app.get("/",(req,res,next)=>{
    
    res.render("home",{chk:"home"})
})


app.get("/admin",(req,res)=>{
    User.find({},(err,result)=>{
        if(err){
            console.log("find err : "+err);
        }else{
            if(result){
            res.render("admin",{chk:"admin",dataSend:result})
            }else{
                res.send("no document")
            }

        }
    })
})

////////////////////////////////////////////// big admin //////////////////////////////////////////////

let bigadminMenu="bigadmin";
var data;

app.get("/bigadmin",(req,res,next)=>{
    findStaff()
    res.render("bigAdmin",{menuselect:bigadminMenu,stafList:data})
    next (change())

});
function change(){
    bigadminMenu ="bigadmin";
    data =false;
}

////////////////////////////////////////////// big admin Menu //////////////////////////////////////////////

app.get("/bigadmin/:adminMenu",(req,res)=>{

    bigadminMenu = req.params.adminMenu
   if(bigadminMenu==='editadmin'){
    findStaff();

   }

    res.redirect("/bigadmin")
})
    
// /////////////////////////////////////////////// select category ////////////////////////////////////////////

const tyPe={
    lp:["For Rent","For Sale"],
    sha:["Apartments","Builder Floors","Farm Houses","Houses & Villas"],
    rha:["Apartments","Builder Floors","Houses & Villas"],
    pgh:["Guest Hoses","PG","Roommate"]

}
const head =["Land & Plot", "Sale House & Apartment","Rent House & Apartment","PG & Guest Hoses","Sale Shop & Office","Rent Shop & Office"]

let postName='';
let headTitle='';


app.get("/add",(req,res,next)=>{
    let typ ='';
    if(postName){
        switch (postName) {
            case "lp":
                typ = tyPe.lp;
                headTitle =head[0];
                
                break;
                case "sh&a":
                    typ =tyPe.sha
                    headTitle =head[1];
                break;
                case "rh&a":
                    typ =tyPe.rha;
                    headTitle =head[2];
                break;
                case "p&gh":
                    typ =tyPe.pgh;
                    headTitle =head[3];
                break;
                case "ss&o":
                    headTitle =head[4];
                break;
                case "rs&o":
                    headTitle =head[5];
                break;


        
            default:
                break;
        }

    res.render("add",{head:headTitle,type:typ,menCheck:postName})
    next(empty());
    }else{

        res.redirect("/admin")
    }
});

function empty(){
    // postName='';
    console.log("next");
    
}




app.get("/cat/:postname",(req,res)=>{

    postName = req.params.postname;
    console.log(postName);
    

    res.redirect("/add")
})

// ////////////////////////////////////////////////// add items //////////////////////////////////////////

app.post("/add",upload.array('pic', 12),(req,res)=>{
    // console.log(req.files[0].filename);
    const file= req.files
    console.log(req.body);

    const file_names = []
    file.forEach((data)=>{
        file_names.push(data.filename)
    })
    const data = new User({
        data:req.body,
        file_name:file_names

    })

    data.save().then(()=>{
        console.log("Saved");



        res.redirect("/admin");

    }).catch((err)=>{
        console.log(err);
        res.send(err)
    })

   
})

/////////////////////////////////////////// Login Sign Up //////////////////////////////////////////////////

app.get("/login",(req,res)=>{
    res.render("logorsi",{chk:"login"})
});

app.post("/login",(req,res)=>{
    res.send(req.body);
})




app.get("/signup",(req,res)=>{
    res.render("logorsi",{chk:"signup"})
})








//////////////////////////////////////////////////// Aproove /////////////////////////////////////// 

let apResult ='';
app.get("/aproove/:apId",(req,res)=>{

    apResult=''
    const aprooveId = req.params.apId;
    User.findOne({_id:aprooveId},(err,result)=>{
        if(err){
            console.log("Find error : "+err);
        }else{
            apResult =result
            console.log(apResult);
            res.redirect("/aproove")
        }
    })
})

app.get("/aproove",(req,res)=>{
    res.render("aproove",{cont:apResult})
})
// //////////////////////////////////////////////////// Add Staff ////////////////////////////////////////////
app.post('/addStaff',(req,res)=>{
    const stafFname = req.body.fname;
    const stafLname = req.body.lname;
    const phoneNum = req.body.phone;
    const mail = req.body.email;
    const pass = passGenerator();



    const staff = new Staff({
        firstname :stafFname,
        lastname:stafLname,
        phoneNo : phoneNum,
        email : mail,
        username:mail,
        password:pass
    })
    staff.save((err)=>{
        if(err){
            console.log(err);
        }else{
            postMail(mail,pass,stafFname,(err,info)=>{
                if(!err){
                console.log(err);
                }else{
                    console.log(info)
                }
            });
            res.redirect("/bigadmin/editadmin");
            

        }
    })

})


app.get("/staff/details/:staffId",(req,res)=>{
    const id = req.params.staffId;
    res.send(id)

    
})

app.listen(3000 || process.env.PORT,()=>{
    console.log("Server started at Port : 3000");
})

// functions

function passGenerator(){
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = '6';
    password ='';
    
    for(i=0;i<=passwordLength;i++){
        var randNo =Math.floor(Math.random()*chars.length);
        password += chars.substring(randNo,randNo+1);
    }
    return password;
}

function postMail(uname,password,name,callback){

    const mailOptions ={
        from:'unnitestone@gmail.com',
        to:uname,
        subject:'Auto real Login Details',
        html:`<h1>hai `+name+`</h1>
        <h2>Username : <i>`+uname+`</i></h2>
        <h2>Password : <i>`+password+`</i></h2>
        <h5 style='color:red;'>*Change Password after first login</h5>
        <p>login <a href=http://127.0.0.1:3000/login>here</a></p>`
        
    }

    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            return callback(err);
        }else{
            return callback(info.response);
            
        }
    })

}

function findStaff(){
    Staff.find({},(err,result)=>{
        if(err){
            console.log("Error : >> "+err);
        }else if(result.length >0){
            data =result;
        }else{
            data = false;
        }
    })
}