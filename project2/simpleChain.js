const SHA256 = require("crypto-js/sha256");
const LevelSandbox = require("./levelSandbox");
const Block = require("./block");

/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/
class Blockchain {
	constructor() {
		this.db = new LevelSandbox();
		this.getBlockHeight().then((height) => {
			if (height === -1) {
				this.addGenesisBlock();
			}
		});
	}

	// Add genesis block
	addGenesisBlock() {
		this.addBlock(new Block("Genesis Block")).then(() => console.log("Added genesis block!"));
	}

	// Add new block
	async addBlock(newBlock) {

		// Block height
		const height = await this.getBlockHeight();
    
		// add genesis block if it doesn't exist
		if (height === -1 && !this.getBlock(0)) {
			await this.addGenesisBlock();
		}
    
		newBlock.height = height + 1; 
		newBlock.time = new Date().getTime().toString().slice(0,-3); // UTC timestamp

		// previous block hash
		if(newBlock.height > 0) {
			const previousBlock = await this.getBlock(height);
			newBlock.previousBlockHash = previousBlock.hash;
		}

		// Block hash with SHA256 using newBlock and converting to a string
		newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
    
		// persist to LevelDB
		return JSON.parse(await this.db.addBlockToDB(newBlock.height, JSON.stringify(newBlock).toString()));
	}

	// Get block height
	async getBlockHeight() {
		return await this.db.getBlockHeightFromDB();
	}

	// get block
	async getBlock(blockHeight) {
		return JSON.parse(await this.db.getBlockFromDB(blockHeight));
	}

	/**************** TESTING METHODS ********************************/

	// validate block
	async validateBlock(block) {
		if (block === undefined || block.hash === undefined) {
			console.log("block or block.hash is undefined");
			return false;
		}
		// get block hash
		let blockHash = block.hash;
		// remove block hash to test block integrity
		block.hash = "";
		// generate block hash
		let validBlockHash = SHA256(JSON.stringify(block)).toString();
		// reset the original block hash
		block.hash = blockHash;
		// Compare
		if (blockHash == validBlockHash) {
			return true;
		} else {
			console.log("Block #"+blockHeight+" invalid hash:\n"+blockHash+"<>"+validBlockHash);
			return false;
		}
	}

	// Validate blockchain
	async validateChain() {
		let block = "";
		let errorLog = [];
		let previousBlock = "";
		let previousHash = "";
		let isValidBlock = false;

		const height = await this.db.getBlockHeightFromDB();
    
		// base case - chain has only 1 block
		if (height === 0) {
			return console.log("No errors detected");
		}

		for (let i = 1; i <= height; i++) {
			// validate block's hash
			block = await this.getBlock(i);
			isValidBlock = this.validateBlock(block);

			if (!isValidBlock) {
				errorLog.push(i);
			}
			// compare blocks hash link
			previousBlock = await this.getBlock(i - 1);
			previousHash = previousBlock.hash;
      
			if (block.previousBlockHash !== previousHash) {
				errorLog.push(i);
			}
		}

		if (errorLog.length > 0) {
			console.log("Block errors = " + errorLog.length);
			console.log("Blocks: " + errorLog);
		} else {
			console.log("No errors detected");
		}
	}

	// Utility Method to Tamper a Block for Test Validation
	modifyBlock(height, block) {
		return new Promise( (resolve, reject) => {
			this.db.addBlockToDB(height, JSON.stringify(block).toString()).then((blockModified) => {
				resolve(blockModified);
			}).catch((err) => { console.log(err); reject(err);});
		});
	}
}

/********************** TEST Implementation **************/
let chain = new Blockchain();

(function theLoop (i) {
	setTimeout(function () {
		let blockTest = new Block("Test Block - " + (i + 1));
		chain.addBlock(blockTest).then((result) => {
			console.log(result);
			i++;
			if (i < 10) theLoop(i);
		});
	}, 100);
})(0);

setTimeout(() => chain.validateChain(), 2000);

