const {
  NODE_ENV = 'development',

  APP_PORT = 3000,
  APP_HOSTNAME = 'localhost',
  APP_PROTOCOL = 'http',
  PORT_FRONT_END=4224,

  APP_SECRET = '4d2ca599b4189f74a771f44b8a8d06f572208b5649f5ae216f8e94612a267ff0'
} = process.env




module.exports={
  APP_ORIGIN:`${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`,
   IN_PROD : NODE_ENV === 'production',
   URL:`${APP_PROTOCOL}://${APP_HOSTNAME}:${APP_PORT}`,
   URL_FRONT_END:`${APP_PROTOCOL}://${APP_HOSTNAME}:${PORT_FRONT_END}`
}