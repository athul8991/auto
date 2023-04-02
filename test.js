// function getLocation() {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(showPosition);
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   }
//   function showPosition(position) {
//     var lat = position.coords.latitude;
//     var lng = position.coords.longitude;
//     map.setCenter(new google.maps.LatLng(lat, lng));
//   }

const { stubString } = require("lodash");

//   console.log(getLocation())
//   console.log(showPosition());

// const nodemailer = require('nodemailer');


// var transporter = nodemailer.createTransport({
//     service:'gmail',
//     auth :{
//         user:'unnitestone@gmail.com',
//         pass:process.env.PASSWORD
//     }
// });

// let mailOptions ={
//     from:'unnitestone@gmail.com',
//     to:'athuls8991@gmail.com',
//     subject:'Mail from Tester',
//     html:`<h1>Username : something </h1>,
//     <h1 style='color:red;'>Password : something</h1>`
// }

// transporter.sendMail(mailOptions,(err,info)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log('Email sent : '+info.response);
//     }
// });

// password generator

// var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
// let passwordLength = '6';
// password ='';

// for(i=0;i<=passwordLength;i++){
//     var randNo =Math.floor(Math.random()*chars.length);
//     password += chars.substring(randNo,randNo+1);
// }

// let uname = 'username';
// let phonenumber = '9495003321';
// let number = Number(phonenumber.slice(6,10));

// let rando = Math.floor(Math.random()*100);
// console.log(password);
