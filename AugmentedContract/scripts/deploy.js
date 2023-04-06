const { TransactionDescription } = require("ethers/lib/utils");

// when we run this script all transaction all going to deploy and then we get a address of our smartcontract to deployed on a blockchain network....
//but our contract to be deployed we need a etherium on our wallet already everything we do on etherium network required etherium gas which is small fraction of etherium used to make something happen

const main = async () => {
  // this is a like a function factory and class that generate instances of that specific contract
  const transactionsFactory = await hre.ethers.getContractFactory("Ecommerce");

  const transactionsContract = await transactionsFactory.deploy();

  await transactionsContract.deployed();

  console.log("Transactions address: ", transactionsContract.address);
};

const runMain = async () => {
  try {
    await main();
    // which means that process went successfull
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
