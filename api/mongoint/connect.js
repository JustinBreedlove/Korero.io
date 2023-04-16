const { MongoClient } = require("mongodb");
require('dotenv').config();

const uri = `mongodb://${process.env.MONGOUSER}:${encodeURIComponent(process.env.MONGOPASSWORD)}@${process.env.MONGOIP}:27017/?authMechanism=DEFAULT`;
const client = new MongoClient(uri);

module.exports = client;