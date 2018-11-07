Project 1 : Managing Blockchain Identity
// Shortcut - save file as .js and run to verify
const bitcoinMessage = require("bitcoinjs-message");

// Wallet address
const address = '1NhS3zAx7kJZrq7RrUm1PX8hP1b3dQo3xV'

// Message
const message = '1NhS3zAx7kJZrq7RrUm1PX8hP1b3dQo3xV: Udacity rocks!'

// Message Signature
const signature = 'ICyZ5O4hfhgB1ZjDLn7RU5YZWPZ4sVeQlNBU8y9lhBS/D51FxeY+PTN7VaX2X8RaWJNeRm/YR7XUqq2hXj2hdiA='

console.log(bitcoinMessage.verify(message, address, signature));
