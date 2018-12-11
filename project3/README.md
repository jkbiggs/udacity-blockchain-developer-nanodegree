## Framework used
Express.js

## Getting started
Clone the repository to your local computer.
```
git clone https://github.com/jkbiggs/udacity-blockchain-developer-nanodegree.git
```

Open the terminal and change directory to Project 3
```
cd project3
```

Install the project packages:
```
npm install
```

## Testing
Run the server:
```
node app.js
```

Use a software like Postman (or a simple CURL on the terminal) to send the requests to the base url http://localhost:8000 with one of the below supported endpoints:

<<<<<<< HEAD
#GET
Test the edge cases < 0 and out of bounds
-http://localhost:8000/block/-1 (should throw out of bounds exception)
-http://localhost:8000/block/5
-http://localhost:8000/block/10 (should throw out of bounds exception, if a post hasn't been made)
=======
GET
http://localhost:8000/api/block/-1 (should throw out of bounds exception)

http://localhost:8000/api/block/5

http://localhost:8000/api/block/10 (should throw out of bounds exception, if a post hasn't been made)
>>>>>>> 661dddab4a019a91b29b7b1634599398f834be3c

```
 curl http://localhost:8000/block/0
```

#POST
Test the posting of a new block.  Make sure to add raw json body data 
-http://localhost:8000/block

```
 curl -X "POST" "http://localhost:8000/block" -H 'Content-Type: application/json' -d $'{"body":"block body contents"}'
```
