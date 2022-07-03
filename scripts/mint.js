require("dotenv").config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const alchemyWeb3 = createAlchemyWeb3(process.env.NODE_URL);

const { Command } = require("commander");
const program = new Command();

program
  .option("-n, --name <name>", "Contract Name")
  .option("-c, --contract <contract>", "Contract Address")
  .option("-m, --metadata <metadata>", "Metadata Address")
  .option("-p, --public <public>", "Account public address")
  .option("-pi, --private <private>", "Account private address");

program.parse(process.argv);

const options = program.opts();

const path = `../artifacts/contracts/${options.name}.sol/${options.name}.json`;

console.log("Contract Path:", path);

const contract = require(path);

const nftContract = new alchemyWeb3.eth.Contract(
  contract.abi,
  options.contract
);

async function mintNFT(tokenURI) {
  // get the nonce - nonce is needed for security reasons. It keeps track of the number of
  // transactions sent from your address and prevents replay attack.
  const nonce = await alchemyWeb3.eth.getTransactionCount(
    options.public,
    "latest"
  );

  console.log("Account: ", options.public);

  const tx = {
    from: options.public, // your metamask public key
    to: options.contract, // the smart contract address we want to interact with
    nonce: nonce, // nonce with the no of transactions from our account
    gas: 1000000, // fee estimate to complete the transaction

    data: nftContract.methods.createNFT(options.public, tokenURI).encodeABI(), // call the balanceOfOwner
  };

  const signPromise = alchemyWeb3.eth.accounts.signTransaction(
    tx,
    options.private
  );

  signPromise
    .then((signedTx) => {
      alchemyWeb3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

mintNFT("https://ipfs.io/ipfs/" + options.metadata); // pass the CID to the JSON file uploaded to Pinata
