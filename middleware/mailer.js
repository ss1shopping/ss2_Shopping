const nodemailer=require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');
const JWT =require("jsonwebtoken")
const key=require('../config/index')
const config =require('../config/app')
signToken = users => {
  return JWT.sign({
    iss: 'xoaycodeesy',
    sub: users._id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, key.secretkey);
}
signTokenforgotPassword = users => {
  return JWT.sign({
    iss: 'xoaycodeesy',
    sub: users._id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, key.forgottoken);
}
const tranport=nodemailer.createTransport(smtpTransport(
  
{

        service:"gmail",
        host: 'smtp.gmail.com',
        
        auth: {
            user: key.username, //Tài khoản gmail vừa tạo
            pass: key.password //Mật khẩu tài khoản gmail vừa tạo
        },
      tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
})
)

const sendConfirmationEmail= async(users)=>{
 
  
    const token=signToken(users)
    const url=`${config.URL_FRONT_END}/users/login/${token}`
   tranport.sendMail({
       from:"xoaycodeeasy@gmail.com",
       to:`${users.email}`,
       subject:"Confirmation Email",
       html:`Confirmation email <a href=${url}>${url}</a>`
   }).then(()=>{
       console.log("send successful");
       
   })
   

}
const sendConfirmationEmailToChangepassword= async(users)=>{
    const token=signTokenforgotPassword(users)
    //link front end will sent with token wanna recieve
    const url=`${config.URL_FRONT_END}/login/forgotpassword/verify/${token}`  
   tranport.sendMail({
       from:"xoaycodeeasy@gmail.com",
       to:`${users.email}`,
       subject:"Confirmation Email",
       html:`Confirmation email <a href=${url}>${url}</a>`
   }).then((res)=>{
      console.log("send");
      res({token})
       
   })
   

}
exports.sendConfirmationEmailToChangepassword=sendConfirmationEmailToChangepassword
exports.sendConfirmationEmail=sendConfirmationEmail