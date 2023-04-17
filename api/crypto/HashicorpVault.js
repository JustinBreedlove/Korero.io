//import fetch from 'node-fetch';
require('dotenv').config();
var crypto = require('crypto'); // Importing the crypto module for generating RSA key pairs
const { get } = require('http');


// Ignore self-signed SSL certificate errors
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

//set .env variables for the Vault address and the root token
const VAULT_ADDR = process.env.VAULT_ADDR;
const VAULT_TOKEN = process.env.VAULT_TOKEN;

// Check Vault service health
fetch(`${VAULT_ADDR}/v1/sys/health`, {
  headers: {
    'X-Vault-Token': VAULT_TOKEN,
  },
  rejectUnauthorized: false,
})
.then((response) => response.json())
.then((data) => console.log(data))
.catch((error) => console.error(error));

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
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
    rejectUnauthorized: false // ignore self-signed SSL certificate errors
  });
  if (!response.ok) {
    throw new Error(`Failed to write secret for user ${userId}: ${response.status} ${await response.text()}`);
  }
  console.log(`Successfully wrote secret for user ${userId}`);
}

// Call the function with the user ID to write a user's public and private keys to Vault
// writeUserSecret('001');
// writeUserSecret('002');

// Function to get the private key for a given user
async function getPrivateKey(userId) {
  const url = `${VAULT_ADDR}/v1/secret/data/users/${userId}`;
  const headers = { 'X-Vault-Token': VAULT_TOKEN };
  const response = await fetch(url, { headers });
  const { data } = await response.json();
  const privateKey = data.data.privateKey;
  return {
    privateKey: privateKey
  };
}

// Function to get the public key for a given user
async function getPublicKey(userId) {
  const url = `${VAULT_ADDR}/v1/secret/data/users/${userId}`;
  const headers = { 'X-Vault-Token': VAULT_TOKEN };
  const response = await fetch(url, { headers });
  const { data } = await response.json();
  const publicKey = data.data.publicKey;
  return {
    publicKey: publicKey
  };
}
 
 // Function to encrypt a message using the public key of the recipient
async function encryptMessage(msg, user2UserID) {
  const { publicKey } = await getPublicKey(user2UserID);
  const buffer = Buffer.from(msg, 'utf8');
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
}

// Function to decrypt a message using the private key of the recipient
async function decryptMessage(encryptedMessage, recipientId) {
  const { privateKey } = await getPrivateKey(recipientId);
  const buffer = Buffer.from(encryptedMessage, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
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






//example use
/*
// 002 wants to send a message to 001
const message = 'Hello 001! This message is encrypted.';
console.log(message);

// Encrypt the message using 001's public key
const encryptedMessage = encryptMessage(message, '001');
console.log(encryptedMessage);

// 001 receives the encrypted message and decrypts it
const decryptedMessage = decryptMessage(encryptedMessage, '001');
console.log(decryptedMessage); // Output: Hello 001! This message is encrypted.
*/




