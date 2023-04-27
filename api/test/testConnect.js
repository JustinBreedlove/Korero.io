const sinon = require('sinon');
const { expect } = require('chai');
const { MongoClient } = require('mongodb');
const clientModule = require('../mongoint/connect');

describe('MongoDB client module', () => {
<<<<<<< HEAD
	  let mockClient;

	  beforeEach(() => {
		      mockClient = sinon.createStubInstance(MongoClient);
		      sinon.stub(MongoClient, 'connect').resolves(mockClient);
		    });

	  afterEach(() => {
		      sinon.restore();
		    });

	  it('exports a MongoDB client instance', async () => {
		      const client = await clientModule;
		      expect(client).to.equal(mockClient);
		      sinon.assert.calledOnceWithExactly(MongoClient.connect, uri);
		    });
});

=======
  let mockClient;

  beforeEach(() => {
    mockClient = sinon.createStubInstance(MongoClient);
    sinon.stub(MongoClient, 'connect').resolves(mockClient);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('exports a MongoDB client instance', async () => {
    const client = await clientModule;
    expect(client).to.equal(mockClient);
    sinon.assert.calledOnceWithExactly(MongoClient.connect, uri);
  });
});
>>>>>>> 412f0568d7ab82841b149d467097efac0328c9c2
