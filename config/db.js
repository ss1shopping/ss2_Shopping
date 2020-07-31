const {
MONGO_USERNAME="test",
MONGO_PASSWORD="test",
MONGO_DATABASE="test"
}=process.env



module.exports={
 MONGO_Option:{
   useNewUrlParser:true,
   useCreateIndex:true,
   useUnifiedTopology:true
},
MONGO_URI:`mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@cluster0-vaatg.mongodb.net/${MONGO_DATABASE}?retryWrites=true&w=majority`

}