 const SessionOptions =require ("express-session")
//  import("express-session").SessionOptions
const app =require ("./app");
const ONE_HOUR = 1000 * 60 * 60

const THIRTY_MINUTES = ONE_HOUR / 2

const SIX_HOURS = ONE_HOUR * 6
 const {
 SESSION_SECRET = 'tienhihi',
  SESSION_NAME = 'tien',
  SESSION_IDLE_TIMEOUT = THIRTY_MINUTES
} =process.env

module.exports={
Session_Option:{
  secret: SESSION_SECRET,
  name: SESSION_NAME,
  cookie: {
    maxAge: +SESSION_IDLE_TIMEOUT,
    secure: app.IN_PROD,
    sameSite: true
  },
  rolling: true,
  resave: false,
  saveUninitialized: false
}
}