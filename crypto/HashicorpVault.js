import fetch from 'node-fetch'; // Importing the fetch module for making HTTP requests
import crypto from 'crypto'; // Importing the crypto module for generating RSA key pairs

const VAULT_API_URL = 'http://127.0.0.1:8200'; // The base URL of the Vault API
const VAULT_API_HEALTH_ENDPOINT = '/v1/sys/health'; // The endpoint to check the health of the Vault API

// Function to check the health of the Vault API
async function checkVaultConnection() {
  const url = `${VAULT_API_URL}${VAULT_API_HEALTH_ENDPOINT}`;
  const headers = { 'X-Vault-Token': 'hvs.3UQmKXo87EMekL9S2LnK0NWh' };
  const response = await fetch(url, { headers });

  if (response.ok) {
    const data = await response.json();
    console.log('Vault is accessible and authenticated!', data);
  } else {
    throw new Error(`Failed to check Vault connection: ${response.statusText}`);
  }
}

//checkVaultConnection();

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

// Function to write the RSA key pair to Vault for a given user
async function writeUserSecret(userId) {
  const { publicKey, privateKey } = await generateKeyPair();
  const url = `http://127.0.0.1:8200/v1/secret/data/users/${userId}`;
  const headers = {
    'X-Vault-Token': 'hvs.3UQmKXo87EMekL9S2LnK0NWh',
    'Content-Type': 'application/json'
  };
  const data = { 
    publicKey,
    privateKey
  };
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data })
  });
  console.log(`Status: ${response.status}`);
}

//writeUserSecret('001');
//writeUserSecret('002');

// Function to get the private key for a given user
async function getPrivateKey(userId) {
  const url = `http://127.0.0.1:8200/v1/secret/data/users/${userId}`;
  const headers = { 'X-Vault-Token': 'hvs.3UQmKXo87EMekL9S2LnK0NWh' };
  const response = await fetch(url, { headers });
  const { data } = await response.json();
  const privateKey = data.data.privateKey;
  console.log(privateKey); // Output the private key
  return {
    privateKey: privateKey
  };
}
// Function to get the public key for a given user
async function getPublicKey(userId) {
  const url = `http://127.0.0.1:8200/v1/secret/data/users/${userId}`;
  const headers = { 'X-Vault-Token': 'hvs.3UQmKXo87EMekL9S2LnK0NWh' };
  const response = await fetch(url, { headers });
  const { data } = await response.json();
  const publicKey = data.data.publicKey;
  console.log(publicKey); // Output the public key
  return {
    publicKey: publicKey
  };
}



getPrivateKey('002');
getPublicKey('002');
getPublicKey('001');
getPrivateKey('001');