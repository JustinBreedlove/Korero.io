async function exampleAsyncFunction() {
	    var {encryptAMessage}  = require("../crypto/HashicorpVault");
	    
	    const msg = "uwu uwu uwu uwu";
	    const userid = "001";
	    
	    const encryptedMsg = await encryptAMessage(msg, userid);
	    console.log(encryptedMsg);
	  }
  
  exampleAsyncFunction();
