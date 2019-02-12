const level = require("level"); 
const chainDB = "./chaindata"; // folder path that stores the data

class LevelSandbox {
	constructor() {
		this.db = level(chainDB);
	}

	// Add data to levelDB with key and value
	addBlockToDB(key, value) {
		return new Promise((resolve, reject) => {
			this.db.put(key, value, (error) => {
				if (error) {
					console.log("Block " + key + " submission failed", error);
					reject(error);
				}
				console.log("Added block #" + key);
				resolve(value);
			});
		});
	}
	// Get data from levelDB with a key (Promise)
	getBlockFromDB(key) {
		return new Promise((resolve, reject) => {
			this.db.get(key, (error, value) => {
				if (error) {
					if (error.type == "NotFoundError") {
						resolve(undefined);
					} else {
						console.log("Block " + key + " get failed", error);
						reject(error);
					}
				} else {
					resolve(value);
				}
			});
		});
	}

	// Implement this method
	getBlockHeightFromDB() {
		return new Promise((resolve, reject) => {
			let height = -1;

			this.db.createReadStream()
				.on("data", () => {
					// Count each object inserted
					height++;
				})
				.on("error", (error) => {
					// reject with error
					reject(error);
				})
				.on("close", () => {
					//resolve with the count value
					resolve(height);
				});
		});
	}
}

module.exports = LevelSandbox;
