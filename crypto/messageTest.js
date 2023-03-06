const crypto = require('crypto');

const generateKeyPair = () => {
  return crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem'
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem'
      },
      primeLength: 2048,
      publicExponent: 0x10001,
      rng: crypto.randomBytes
  });
};

// Generate a new RSA key pair for party 1
const party1Key = generateKeyPair();

// Generate a new RSA key pair for party 2
const party2Key = generateKeyPair();

// Function to encrypt a message using RSA
function encryptRSA(message, publicKey) {
  const buffer = Buffer.from(message, 'utf8');
  const encrypted = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
    buffer
  );
  return encrypted.toString('base64');
}

// Function to decrypt an encrypted message using RSA
function decryptRSA(encryptedMessage, privateKey) {
  const buffer = Buffer.from(encryptedMessage, 'base64');
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING
    },
    buffer
  );
  return decrypted.toString('utf8');
}

// Function to encrypt a message using AES
function encryptAES(message, key) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(message, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return iv.toString('hex') + ':' + encrypted;
}

// Function to decrypt an encrypted message using AES
function decryptAES(encryptedMessage, key) {
  const parts = encryptedMessage.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encrypted = parts.join(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Function for Party 1 to send a message to Party 2
function sendMessage(message, publicKey) {
    // Encrypt the message using AES and a shared secret key
    const sharedSecretKey = crypto.randomBytes(32);
    const encryptedMessage = encryptAES(message, sharedSecretKey);
  
    // Encrypt the shared secret key using RSA and party 2's public key
    const encryptedKey = encryptRSA(sharedSecretKey.toString('base64'), publicKey);
  
    // Return the encrypted message and encrypted key
    return { encryptedMessage, encryptedKey };
  }
  
  // Function for Party 2 to receive a message from Party 1
  function receiveMessage(encryptedMessage, encryptedKey, privateKey) {
    // Decrypt the shared secret key using party 2's private key
    const decryptedKey = decryptRSA(encryptedKey, privateKey);
    const decryptedKeyBuffer = Buffer.from(decryptedKey, 'base64');
  
    // Decrypt the message using the decrypted shared secret key
    const decryptedMessage = decryptAES(encryptedMessage, decryptedKeyBuffer);
  
    // Return the decrypted message
    return decryptedMessage;
  }






//SIMULATING A FEW MESSAGES BETWEEN TWO PARTIES
console.log();

// Party 1 sends a message to Party 2
const message1 = 'Hello, Bob this is Alice!';
const { encryptedMessage: party1Message, encryptedKey: party1KeyEncrypted } = sendMessage(message1, party2Key.publicKey);
console.log("Party 1 encrypted message:", party1Message);
console.log("Party 1 encrypted key:", party1KeyEncrypted);

// Party 2 receives the message from Party 1
const party2Message = receiveMessage(party1Message, party1KeyEncrypted, party2Key.privateKey);
console.log("Party 2 decrypted message:", party2Message);
console.log();

// Party 2 sends a reply to Party 1
const message2 = 'Hi, Alice! How are you?';
const { encryptedMessage: party2MessageEncrypted, encryptedKey: party2KeyEncrypted } = sendMessage(message2, party1Key.publicKey);
console.log("Party 2 encrypted message:", party2MessageEncrypted);
console.log("Party 2 encrypted key:", party2KeyEncrypted);

// Party 1 receives the reply from Party 2
const party1Reply = receiveMessage(party2MessageEncrypted, party2KeyEncrypted, party1Key.privateKey);
console.log("Party 1 decrypted message:", party1Reply);
console.log();

// Party 1 sends a message to Party 2
const message3 = 'Im good Bob, thank you!';
const { encryptedMessage: party1Message2, encryptedKey: party1KeyEncrypted2 } = sendMessage(message3, party2Key.publicKey);
console.log("Party 1 encrypted message:", party1Message2);
console.log("Party 1 encrypted key:", party1KeyEncrypted2);

// Party 2 receives the message from Party 1
const party2Message3 = receiveMessage(party1Message2, party1KeyEncrypted2, party2Key.privateKey);
console.log("Party 2 decrypted message:", party2Message3);
console.log();