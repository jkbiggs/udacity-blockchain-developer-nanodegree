// Task 1: Setup the 2 required libraries
const bitcoinMessage = require("bitcoinjs-message");

// Task 2: Verify the message. Determine which was the signature produced if the given address was used to sign the given message.
// Hint: Try console logging to see the return value of the method.
const myAddress = '1NhS3zAx7kJZrq7RrUm1PX8hP1b3dQo3xV'
const message = '1NhS3zAx7kJZrq7RrUm1PX8hP1b3dQo3xV: Udacity rocks!'
const signature = 'ICyZ5O4hfhgB1ZjDLn7RU5YZWPZ4sVeQlNBU8y9lhBS/D51FxeY+PTN7VaX2X8RaWJNeRm/YR7XUqq2hXj2hdiA='

console.log(bitcoinMessage.verify(message, myAddress, signature));
