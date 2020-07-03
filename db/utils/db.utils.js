const getDbConnection =()=>{
    const {
        DATABASE_HOST,
DATABASE_PORT,
DATABASE_USER,
DATABASE_PASS,
DATABASE_NAME,
DATABASE_POOL_MIN,
DATABASE_POOL_MAX,
SALT_ROUNDS,
    }=process.env;
    return{
        host:DATABASE_HOST,
        port:+DATABASE_PORT,   //dau plus de convert sang number
        database:DATABASE_NAME,
        user:DATABASE_USER,
        password:DATABASE_PASS
    }
}
exports.getKnexConfig = () => {
  const connection = getDbConnection();
  const { DATABASE_POOL_MIN: min, DATABASE_POOL_MAX: max } = process.env;

  return {
    client: 'postgresql',
    connection,
    pool: {
      min: +min,
      max: +max,
    },
  };
};