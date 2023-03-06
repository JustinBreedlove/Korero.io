const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = `mongodb://${process.env.MONGOUSER}:${encodeURIComponent(process.env.MONGOPASSWORD)}@192.252.223.33:27017/?authMechanism=DEFAULT`;
const client = new MongoClient(uri);

module.exports = client;