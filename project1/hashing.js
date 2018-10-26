
const SHA256 = require("crypto-js/sha256");

const data1 = "Blockchain Rock!";
let josh = { Josh:"Biggs"};

function generateHash(obj) {
  return SHA256(JSON.stringify(obj));
}

console.log("SHA256: " + generateHash(data1));
console.log("SHA256: " + generateHash(josh));
