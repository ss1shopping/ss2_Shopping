
const {
REDIS_PORT =6379,
REDIS_HOST="localhost",

} =process.env


module.exports={
    Redis_Option:{
 port:+REDIS_PORT,
 host:REDIS_HOST,
 
}
}