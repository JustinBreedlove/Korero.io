const assert = require("chai").assert;
const sinon = require("sinon");
const { MongoClient } = require("mongodb");
const createChat = require("../mongoint/createChat");
const { encryptAMessage }  = require("../crypto/HashicorpVault");
require('dotenv').config();

describe("createChat", function() {
  let client;
  let user1 = { userid: "123", name_short: "John" };
  let user2 = { userid: "456", name_short: "Jane" };
  let msg = "Hello, Jane!";
  let sessionid = "abc";
  let sandbox;

  before(async function() {
    client = await MongoClient.connect(`mongodb://${process.env.MONGOUSER}:${encodeURIComponent(process.env.MONGOPASSWORD)}@192.252.223.33:27017/?authMechanism=DEFAULT`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(function() {
    sandbox = sinon.createSandbox();
  });

  afterEach(function() {
    sandbox.restore();
  });

  after(async function() {
    await client.close();
  });

  it("should encrypt the message before storing it in the database", async function() {
    const database = client.db("test_db");
    const messages = database.collection("messages");
    const users = database.collection("users");

    // Stub the MongoDB methods
    sandbox.stub(mongo, "db").returns(database);
    sandbox.stub(users, "findOneAndUpdate");
    sandbox.stub(messages, "findOne").resolves(null);
    sandbox.stub(messages, "insertOne");

    // Call the function to create a chat and get the chatid
    const chatid = await createChat(user1, user2, msg, sessionid);

    // Assert that the encryption function was called with the correct arguments
    sinon.assert.calledWith(encryptAMessage, msg, user2.userid);

    // Assert that the message was encrypted and inserted into the database
    sinon.assert.calledWith(messages.insertOne, sinon.match({
      messages: sinon.match([{
        message: sinon.match.string
      }])
    }));

    // Assert that the chatid is a string with a 64-character hexadecimal format
    assert.match(chatid, /^[a-fA-F0-9]{64}$/);

    // Log the original message and the encrypted message
    console.log(`Original message: ${msg}`);
    console.log(`Encrypted message: ${await encryptAMessage(msg, user2.userid)}`);
  });
});
