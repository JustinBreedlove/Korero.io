require('dotenv').config();
var crypto = require('crypto');
const https = require('https');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const VAULT_ADDR = process.env.VAULT_ADDR; 
const VAULT_TOKEN = process.env.VAULT_TOKEN; 

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

async function writeUserSecret(userId) {
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
		      rejectUnauthorized: false,
		    };
	  const req = https.request(url, options, (res) => {
		      if (res.statusCode < 200 || res.statusCode >= 300) {
			            throw new Error(`Failed to write secret for user ${userId}: ${res.statusCode}`);
			          }
		    });
	  req.write(JSON.stringify(data));
	  req.end();
}


writeUserSecret("001");
writeUserSecret("002");


async function getPublicKey(userId) {
	  const url = `${VAULT_ADDR}/v1/secret/data/users/${userId}`;
	  const headers = { 'X-Vault-Token': VAULT_TOKEN };
	  const options = {
		      method: 'GET',
		      headers,
		      rejectUnauthorized: false
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
					            const responseData = JSON.parse(data);
					            const publicKey = responseData.data.data.publicKey;
					            if (!publicKey) {
							              reject(new Error(`Failed to parse public key for user ${userId}`));
							            }
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
		      rejectUnauthorized: false
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
					            const responseData = JSON.parse(data);
					            const privateKey = responseData.data.data.privateKey;
					            if (!privateKey) {
							              reject(new Error(`Failed to parse private key for user ${userId}`));
							            }
					            resolve(privateKey);
					          });          
			          });
		      req.on('error', (err) => {
			            reject(err);
			          });
		      req.end();
		    });
}

async function encryptMessage(message, receiverId) {
	  try {
		      const publicKey = await getPublicKey(receiverId);
		      const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(message));
		      return encrypted.toString('base64');
		    } catch (err) {
			        console.error(`Failed to encrypt message:`, err);
			        throw err;
			      }
}

async function decryptMessage(encryptedMessage, userId) {
	  const privateKey = await getPrivateKey(userId);
	  const bufferMessage = Buffer.from(encryptedMessage, 'base64');
	  const decryptedMessage = crypto.privateDecrypt(privateKey, bufferMessage);
	  return decryptedMessage.toString('utf8');
}

async function sendSecureMessage(senderId, recipientId, message) {
	  const encryptedMessage = await encryptMessage(message, recipientId);
	  const decryptedMessage = await decryptMessage(encryptedMessage, recipientId);
	  console.log(`Message from user ${senderId} to user ${recipientId} sent successfully 
	      encrypted: ${encryptedMessage}  
	          decrypted: ${decryptedMessage}
		    `);
}

module.exports.makeKeyPairs = (userid) => {
	  writeUserSecret(userid);
}

module.exports.encryptAMessage = (msg, user2UserID) => { 
	  return encryptMessage(msg, user2UserID);
}

module.exports.decryptAMessage = (encMsg, userid) => {
	  return decryptMessage(encMsg, userid);
}

module.exports.getsPublicKey = (userID) => {
	  return getPublicKey(userID);
}

module.exports.getsPrivateKey = (userID) => {
	  return getPrivateKey(userID);
}

sendSecureMessage('001', '002', 'Hello, how are you?');

