const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require("./levelSandbox");
const BlockClass = require('./Block.js');

/*
    TODO: 
    1. Update .blocks with calls to the db
    2. Add star data to the object being stored and retrieved
    3. Add mempool?
    4. 

*/


/**
 * Controller Definition to encapsulate routes to work with blocks
 */
class BlockController {

    /**
     * Constructor to create a new BlockController, you need to initialize here all your endpoints
     * @param {*} app 
     */
    constructor(app) {
        this.app = app;
        this.blocks = [];
        this.initializeMockData();
        this.getBlockByIndex();
        this.postNewBlock();
    }

    /**
     * GET Endpoint to retrieve a block by index, url: "/block/:index"
     */
    getBlockByIndex() {
        this.app.get("/block/:index", (req, res) => {
            let index = req.params.index;
            if (index < 0 || index >= this.blocks.length) {
                res.status(404).json({
                    "error" : {    
                        "status": 404,
                        "message": "Block not found."   
                    }
                })
            } else {
                res.send(this.blocks[index]);
                //TODO: make sure star info is in response
                //RA 13h 03m 33.35sec, Dec -49° 31’ 38.1” Mag 4.83 Cen
            }
        });
    }

    /**
     * POST Endpoint to add a new Block, url: "/block"
     * Request should contain an address and star
     */
    postNewBlock() {
        this.app.post("/block", (req, res) => {
            if (req.body.address == undefined || req.body.address == "") {
                res.status(400).json({
                    "error" : {
                        "status": 400,
                        "message": "Empty block address."
                    }
                })
            } else {
                // create a new block from the request's body data
                let blockAux = new BlockClass.Block(req.body.body);
                blockAux.height = this.blocks.length;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                
                // get the previous blocks and retrieve it's hash
                if (this.blocks.length > 0) {
                    let previousBlock = this.blocks[this.blocks.length - 1];
                    blockAux.previousBlockHash = previousBlock.hash;
                }

                this.blocks.push(blockAux);
                res.status(201).send(blockAux);
            }
        });
    }

    /**
     *  POST Endpoint to validate request url: "/requestValidation"
     */
    postRequestValidation() {
        this.app.post("/requestValidation", (req, res) => {
            if (req.body.body == undefined || req.body.body == "") {
                res.status(400).json({
                    "error" : {
                        "status": 400,
                        "message": "Empty request validation body."
                    }
                })    
            } else {
                //TODO
            }
        });
    }

    /**
     *  POST Endpoint to validate message signature url: "/message-signature/validate"
     */
    postRequestValidation() {
        this.app.post("/message-signature/validate", (req, res) => {
            if (req.body.body == undefined || req.body.body == "") {
                res.status(400).json({
                    "error" : {
                        "status": 400,
                        "message": "Empty message signature body."
                    }
                })    
            } else {
                //TODO
            }
        });
    }


    /**
     * Help method to initialized Mock dataset, adds 10 test blocks to the blocks array
     */
    initializeMockData() {
        if(this.blocks.length === 0){
            for (let index = 0; index < 10; index++) {
                let blockAux = new BlockClass.Block(`Test Data #${index}`);
                blockAux.height = index;
                blockAux.hash = SHA256(JSON.stringify(blockAux)).toString();
                
                if (this.blocks.length > 0) {
                    let previousBlock = this.blocks[this.blocks.length - 1];
                    blockAux.previousBlockHash = previousBlock.hash;
                }
                this.blocks.push(blockAux);
            }
        }
    }

}

/**
 * Exporting the BlockController class
 * @param {*} app 
 */
module.exports = (app) => { return new BlockController(app);}