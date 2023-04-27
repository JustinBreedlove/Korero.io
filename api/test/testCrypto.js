const { expect } = require('chai');
const { makeKeyPairs, encryptAMessage, decryptAMessage, getsPublicKey, getsPrivateKey } = require('../crypto/HashicorpVault');

describe('writeUserSecret', () => {
    it('should write a user secret to Vault and return the public and private keys', async () => {
      const userId = 'test_user';
      await makeKeyPairs(userId);
      const publicKey = await getsPublicKey(userId);
      const privateKey = await getsPrivateKey(userId);
      expect(publicKey).to.exist;
      expect(privateKey).to.exist;
    });
  });
  
  describe('encryptMessage and decryptMessage', () => {
    it('should encrypt and decrypt a message', async () => {
      //const user1UserID = '001';
      const user2UserID = 'test_user';
      const message = 'Hello, World!';
      const encryptedMessage = await encryptAMessage(message, user2UserID);
      console.log(encryptedMessage);
      const decryptedMessage = await decryptAMessage(encryptedMessage, user2UserID);
      console.log(decryptedMessage);
      expect(decryptedMessage).to.equal(message);
    });
  });
