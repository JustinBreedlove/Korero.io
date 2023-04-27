
import fetch from 'node-fetch';
import crypto from 'crypto'; // Importing the crypto module for generating RSA key pairs

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

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

async function writeUserSecret(userId) {
	  const { publicKey, privateKey } = await generateKeyPair();
	  const url = `https://win-korero.local.windows:8200/v1/secret/data/users/${userId}`;
	  const headers = {
		      'X-Vault-Token': 'hvs.YoDxhLfv4V84de08Ow8adjJD',
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

//writeUserSecret('001'); // call the function with the user ID
//writeUserSecret('002');
// Function to get the private key for a given user
async function getPrivateKey(userId) {
 process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
	const url = `https://win-korero.local.windows:8200/v1/secret/data/users/${userId}`;
    const headers = { 'X-Vault-Token': 'hvs.YoDxhLfv4V84de08Ow8adjJD' };
         const response = await fetch(url, { headers });
           const { data } = await response.json();
             const privateKey = data.data.privateKey;
               
                 return {
                     privateKey: privateKey
                       };
                       }

                       // Function to get the public key for a given user

async function getPublicKey(userId) {
                        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                           const url = `https://win-korero.local.windows:8200/v1/secret/data/users/${userId}`;
                             const headers = { 'X-Vault-Token': 'hvs.YoDxhLfv4V84de08Ow8adjJD' };
                               const response = await fetch(url, { headers });
                                 const { data } = await response.json();
                                   const publicKey = data.data.publicKey;
                                  
                                       return {
                                           publicKey: publicKey
                                             };
                                             }


// Function to encrypt a message using the public key of the recipient
 async function encryptMessage(message, recipientId) {
   const { publicKey } = await getPublicKey(recipientId);
     const buffer = Buffer.from(message, 'utf8');
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

                 // 002 wants to send a message to 001
                 const message = 'Hello 001! This message is encrypted.';
               	console.log(message);
		const encryptedMessage = await encryptMessage(message, '001');
                 console.log(encryptedMessage);

                 // 001 receives the encrypted message and decrypts it
                 const decryptedMessage = await decryptMessage(encryptedMessage, '001');
                 console.log(decryptedMessage); // Output: Hello 001! This message is encrypted.



