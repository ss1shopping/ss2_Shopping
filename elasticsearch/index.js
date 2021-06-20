const { Client } = require('@elastic/elasticsearch')
let node = "https://i-o-optimized-deployment-a34a4c.es.us-west1.gcp.cloud.es.io:9243"

//et node = "http://localhost:9200"
const client = new Client({
  node,
  auth: {
    username: "elastic",
    password: "rwq0xBMHsmcRaaEKCqAsmJaI"
  }
})
module.exports = client
