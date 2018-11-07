/* Using BlockExplorer API to search Block Data */
const be = require('blockexplorer');

// Explore Block Data function
async function getBlock(index) {

    try {
      const hash = await be.blockIndex(index);
      //console.log(hash);
      const blockHash = await JSON.parse(hash).blockHash;
      //console.log(blockHash);
      const block = await be.block(blockHash);

      return console.log(JSON.stringify(JSON.parse(block), null, 4));
    }
    catch (e) {
      return console.log("ERROR: " + e);
    }

}

(function theLoop (i) {
	setTimeout(function () {
        getBlock(i);
        i++;
		if (i < 3) theLoop(i);
	}, 3600);
})(0);
