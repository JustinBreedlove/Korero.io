const { MongoClient } = require("mongodb");
const uri = "mongodb://root:password@192.252.223.33:27017/?authMechanism=DEFAULT";
const client = new MongoClient(uri);
console.log(client.db('admin'))


module.exports = client;