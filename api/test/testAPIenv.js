const assert = require('chai').assert;
require('dotenv').config();

describe('Environment Variables', () => {
  it('should have a valid MongoDB username', () => {
    assert.isString(process.env.MONGOUSER, 'MONGOUSER must be a string');
    assert.isNotEmpty(process.env.MONGOUSER, 'MONGOUSER must not be empty');
  });

  it('should have a valid MongoDB password', () => {
    assert.isString(process.env.MONGOPASSWORD, 'MONGOPASSWORD must be a string');
    assert.isNotEmpty(process.env.MONGOPASSWORD, 'MONGOPASSWORD must not be empty');
  });

  it('should have a valid MongoDB IP address', () => {
    assert.isString(process.env.MONGOIP, 'MONGOIP must be a string');
    assert.isNotEmpty(process.env.MONGOIP, 'MONGOIP must not be empty');
  });

  it('should have a valid Vault address', () => {
    assert.isString(process.env.VAULT_ADDR, 'VAULT_ADDR must be a string');
    assert.isNotEmpty(process.env.VAULT_ADDR, 'VAULT_ADDR must not be empty');
  });

  it('should have a valid Vault token', () => {
    assert.isString(process.env.VAULT_TOKEN, 'VAULT_TOKEN must be a string');
    assert.isNotEmpty(process.env.VAULT_TOKEN, 'VAULT_TOKEN must not be empty');
  });

  it('should fail if MONGOUSER is not defined', () => {
    delete process.env.MONGOUSER;
    assert.isUndefined(process.env.MONGOUSER, 'MONGOUSER must not be defined');
  });

  it('should fail if MONGOPASSWORD is not defined', () => {
    delete process.env.MONGOPASSWORD;
    assert.isUndefined(process.env.MONGOPASSWORD, 'MONGOPASSWORD must not be defined');
  });

  it('should fail if MONGOIP is not defined', () => {
    delete process.env.MONGOIP;
    assert.isUndefined(process.env.MONGOIP, 'MONGOIP must not be defined');
  });

  it('should fail if VAULT_ADDR is not defined', () => {
    delete process.env.VAULT_ADDR;
    assert.isUndefined(process.env.VAULT_ADDR, 'VAULT_ADDR must not be defined');
  });

  it('should fail if VAULT_TOKEN is not defined', () => {
    delete process.env.VAULT_TOKEN;
    assert.isUndefined(process.env.VAULT_TOKEN, 'VAULT_TOKEN must not be defined');
  });
});