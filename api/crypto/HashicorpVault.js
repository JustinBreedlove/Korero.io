
// This code uses http instead of Fetch. this can be updated and ran with https eventually by changing the require and when calling http.

require('dotenv').config();
var crypto = require('crypto'); // Importing the crypto module for generating RSA key pairs
const https = require('https');

// Ignore self-signed SSL certificate errors
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//set .env variables for the Vault address and the root token
const VAULT_ADDR = process.env.VAULT_ADDR; 
const VAULT_TOKEN = process.env.VAULT_TOKEN; 

// Function to generate a new RSA key pair
const generateKeyPair = () => {
  return new Promise((resolve, reject) => {
    crypto.generateKeyPair('rsa', {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      }
    }, (err, publicKey, privateKey) => {
      if (err) {
        reject(err);
      } else {
        resolve({ publicKey, privateKey });
      }
    });
  });
}; 

// Function to write a user's public and private keys to Vault
async function writeUserSecret(userId) {
  // Generate RSA key pair
  const { publicKey, privateKey } = await generateKeyPair();
  const url = `${VAULT_ADDR}/v1/secret/data/users/${userId}`;
  const headers = {
    'X-Vault-Token': VAULT_TOKEN,
    'Content-Type': 'application/json'
  };
  const data = {
    data: {
      publicKey,
      privateKey
    }
  };
  const options = {
    method: 'POST',
    headers,
    rejectUnauthorized: false, // ignore self-signed SSL certificate errors
  };
  const req = https.request(url, options, (res) => {
    if (res.statusCode < 200 || res.statusCode >= 300) {
      throw new Error(`Failed to write secret for user ${userId}: ${res.statusCode}`);
    }
    console.log(`Successfully wrote secret for user ${userId}`);
  });
  req.write(JSON.stringify(data));
  req.end();
}

// Call the function with the user ID to write a user's public and private keys to Vault
//writeUserSecret('001');
//writeUserSecret('002');

async function getPublicKey(userId) {
    const url = `${VAULT_ADDR}/v1/secret/data/users/${userId}`;
    const headers = { 'X-Vault-Token': VAULT_TOKEN };
    const options = {
      method: 'GET',
      headers,
      rejectUnauthorized: false // ignore self-signed SSL certificate errors
    };
    return new Promise((resolve, reject) => {
      const req = https.request(url, options, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`Failed to get public key for user ${userId}: ${res.statusCode}`));
        }
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          //console.log('Response:', data);
          const responseData = JSON.parse(data);
          console.log('Response data:', responseData);
          const publicKey = responseData.data.data.publicKey;

          if (!publicKey) {
            reject(new Error(`Failed to parse public key for user ${userId}`));
          }
          // console.log(`Retrieved public key for user ${userId}: ${publicKey}`);
          resolve( publicKey );
        });
      });
      req.on('error', (err) => {
        reject(err);
      });
      req.end();
    });
  }
  
  
  async function getPrivateKey(userId) {
    const url = `${VAULT_ADDR}/v1/secret/data/users/${userId}`;
    const headers = { 'X-Vault-Token': VAULT_TOKEN };
    const options = {
      method: 'GET',
      headers,
      rejectUnauthorized: false // ignore self-signed SSL certificate errors
    };
    return new Promise((resolve, reject) => {
      const req = https.request(url, options, (res) => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          reject(new Error(`Failed to get private key for user ${userId}: ${res.statusCode}`));
        }
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          //console.log('Response:', data);
          const responseData = JSON.parse(data);
          //console.log('Response data:', responseData);
          const privateKey = responseData.data.data.privateKey;
          if (!privateKey) {
            reject(new Error(`Failed to parse private key for user ${userId}`));
          }
          //console.log(`Retrieved private key for user ${userId}: ${privateKey}`);
          resolve( privateKey );
        });          
      });
      req.on('error', (err) => {
        reject(err);
      });
      req.end();
    });
  }
  

// Function to encrypt a message with a given public key
async function encryptMessage(message, publicKey) {
    try {
      // const publicKey = await getPublicKey(receiverId);
      const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(message));
      return encrypted.toString('base64');
    } catch (err) {
      console.error(`Failed to encrypt message:`, err);
      throw err;
    }
  }
  
  // Function to decrypt a message with a given private key
  async function decryptMessage(encryptedMessage, userId) {
    const privateKey = await getPrivateKey(userId);
    const bufferMessage = Buffer.from(encryptedMessage, 'base64');
    const decryptedMessage = crypto.privateDecrypt(privateKey, bufferMessage);
    return decryptedMessage.toString('utf8');
  }
  

  // Function to send a secure message to a user
  async function sendSecureMessage(senderId, recipientId, message) {
    // Encrypt the message with the recipient's public key
    const encryptedMessage = await encryptMessage(message, recipientId);
    // Decrypt the message with the recipient's private key
    const decryptedMessage = await decryptMessage(encryptedMessage, recipientId);
    console.log(`Message from user ${senderId} to user ${recipientId} sent successfully 

    encrypted: ${encryptedMessage}  
   
    decrypted: ${decryptedMessage}
    
    `);
  }
  
//when creating a user give them a key pair and save in vault
module.exports.makeKeyPairs = (userid) => {
    writeUserSecret(userid);
  }
  
  //take unencrypted message and make it encrypted using the username of the person its being sent to
  module.exports.encryptAMessage = (msg, user2UserID) => { 
    return encryptMessage(msg, user2UserID);
  }
  
  //take the encrypted message and use the recipients username to find the info to unencrypt back to plain text
  module.exports.decryptAMessage = (encMsg, userid) => {
    return decryptMessage(encMsg, userid);
  }
  
  //use the users ID to get Public key from Vault
  module.exports.getsPublicKey = (userID) => {
    return getPublicKey(userID);
  }
  
  //use the users ID to get Private Key from Vault
  module.exports.getsPrivateKey = (userID) => {
    return getPrivateKey(userID);
  }

  // Call the function with the sender ID, recipient ID, and message to send a secure message
// sendSecureMessage('001', '002', 'Hello, how are you?');
