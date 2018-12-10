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

Use a software like postman or a simple CURL on the terminal to send the requests to the base url http://localhost:8000 with one of the below supported endpoints:

- GET
http://localhost:8000/api/block/-1 --should throw out of bounds exception
http://localhost:8000/api/block/5
http://localhost:8000/api/block/10 --should throw out of bounds exception (if a post hasn't been made)

```
 curl http://localhost:8000/api/block/0
```

-POST
http://localhost:8000/api/block?body=biggieblocks

```
 curl http://localhost:8000/api/block?body=biggieblocks
```
