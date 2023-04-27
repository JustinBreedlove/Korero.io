const expect = require('chai').expect;
const sinon = require('sinon');
const mongo = require('../mongoint/connect');
const userExists = require('../mongoint/userExists');

describe('userExists', () => {
  let usersCollection;
  let unvalidatedUsersCollection;
  let findOneStub;

  before(async () => {
    await mongo.connect();
    const db = mongo.db('korrero');
    usersCollection = db.collection('users');
    unvalidatedUsersCollection = db.collection('unvalidated_users');
  });

  after(async () => {
    await mongo.close();
  });

  beforeEach(() => {
    findOneStub = sinon.stub();
    usersCollection.findOne = findOneStub;
    unvalidatedUsersCollection.findOne = findOneStub;
  });

  afterEach(() => {
    findOneStub.reset();
  });

  it('should return true if username exists in users collection', async () => {
    findOneStub.resolves({ username: 'existing_username' });

    const body = { username: 'existing_username' };
    const result = await userExists(body);

    expect(result).to.be.true;
    expect(findOneStub.calledTwice).to.be.true;
    expect(findOneStub.getCall(0).args[0]).to.deep.equal({ username: 'existing_username' });
  });

  it('should return true if phone exists in unvalidated_users collection', async () => {
    findOneStub.onFirstCall().resolves(null);
    findOneStub.onSecondCall().resolves({ phone: 'existing_phone' });

    const body = { phone: 'existing_phone' };
    const result = await userExists(body);

    expect(result).to.be.true;
    expect(findOneStub.calledThrice).to.be.true;
    expect(findOneStub.getCall(1).args[0]).to.deep.equal({ phone: 'existing_phone' });
  });

  it('should return false if user does not exist', async () => {
    findOneStub.resolves(null);

    const body = { username: 'new_username', phone: 'new_phone', email: 'new_email' };
    const result = await userExists(body);

    expect(result).to.be.false;
    expect(findOneStub.calledThrice).to.be.true;
  });
});
