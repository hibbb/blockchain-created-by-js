const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class BlockChain {
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2018", "Genesis Block of Stephen", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }

        return true;
    }
}

let jsBlockChian = new BlockChain();
jsBlockChian.addBlock(new Block(1, "02/02/2018", { amount: 4 }));
jsBlockChian.addBlock(new Block(1, "03/02/2018", { amount: 10 }));
jsBlockChian.addBlock(new Block(1, "04/02/2018", { amount: 20 }));
jsBlockChian.addBlock(new Block(1, "05/02/2018", { amount: 30 }));


console.log('Is blockchain valid? ' + jsBlockChian.isChainValid());

jsBlockChian.chain[1].data = { amount: 5 };

console.log('Is blockchain valid? ' + jsBlockChian.isChainValid());

//console.log(JSON.stringify(jsBlockChian, null, 4));




