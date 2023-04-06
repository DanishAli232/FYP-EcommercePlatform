require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
// it is the plugin to build smart contract test
module.exports = {
  solidity: "0.8.9",
  // network url is come from alchemy if you dont understand go to video 1:30:38
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/E2aWi06Hu6DOJ2pRjj0Kaqw-KOhS786J",
      // account is the private key of metamask
      accounts: [
        "f1b9ea63464ac07f94089c8d7b0a9e6ba68e8b3f6facc3eeccd4f25cf335712e",
      ],
    },
  },
};
