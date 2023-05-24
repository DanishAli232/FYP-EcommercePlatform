import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Web3 from "web3";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

// etherium is an object that allow us to maintain a relationship between blockchain and etherium relation and we access it after installing metamask extension

// we can send etherium through blockchain from one address to other address second address can be anywhere in the world
const { ethereum } = window;
let web3 = new Web3(Web3.givenProvider || "ws://localhost:3000");

const createEthereumContract = () => {
  const transactionsContract = new web3.eth.Contract(
    contractABI,
    contractAddress
  );
  // const provider = ethers.getDefaultProvider("goerli");
  // console.log(provider);
  // const signer = provider.getSigner();
  // const transactionsContract = new ethers.Contract(
  //   contractAddress,
  //   contractABI,
  //   signer
  // );
  console.log({ transactionsContract });

  return transactionsContract;
};

function convertToHex(amount) {
  const hexAmount = web3.utils.toHex(
    web3.utils.toWei(amount.toString(), "ether")
  );
  return hexAmount;
}

export const TransactionsProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");

  const init = async () => {
    console.log("okkk");
    // const web31 = new Web3(Web3.givenProvider || "ws://localhost:3000");
    // console.log(web31);
    // const id = await web31.eth.net.getId();
    // console.log(id);
    // // const deployedNetwork = contractABI.networks[id];
    // // console.log(deployedNetwork);
    // const contract = new web31.eth.Contract(contractABI, contractAddress);
    // console.log(contract);

    // const addresses = await web31.eth.getAccounts();
    // console.log(addresses);
    // // await contract.methods.setData(10).send({
    // //   from: addresses[0],
    // // });

    // const data = await contract.methods.getAllTransactions().call();
    // console.log(data);

    const web31 = new Web3(Web3.givenProvider || "ws://localhost:3000");
    const contract = new web31.eth.Contract(contractABI, contractAddress);

    const data1 = await contract.methods.getAllTransactions().call();
    console.log(data1);
    web31.eth
      .getAccounts()
      .then(async (accounts) => {
        const account = accounts[0];
        console.log(account);
        if (!account) {
          throw new Error("No account found");
        }
        const data = await contract.methods
          .getAllTransactions()
          .call({ from: account });
        console.log(data);
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    init();
  }, []);
  const [formData, setformData] = useState({
    receiver: "",
    amount: "",
    sendername: "",
    storename: "",
    senderAddress: currentAccount,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e) => {
    console.log(formData);
    setformData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);
      console.log(ethereum);

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        // In createEtheriumContract get all the functions that we specify in transactions.sol..
        const transactionsContract = createEthereumContract();
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        console.log(formData);
        const {
          receiver: _receiver,
          amount,
          sendername: _sendername,
          storename: _productname,
        } = formData;
        console.log(_receiver);
        const transactionsContract = createEthereumContract();
        const _amount = convertToHex(amount); //convert amount into hexadecimal
        console.log(_amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: _receiver,
              // hexadecimal
              gas: "0x5208", // 21000 GWEI 0.000021
              value: _amount, // 0.00001
            },
          ],
        });
        console.log("OK");
        const transactionHash = await transactionsContract.methods
          .payOrder(_productname, _amount, _sendername, _receiver)
          .call();
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        //wait for the transaction to be finished
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);
        const getAllTransactions = await transactionsContract.methods
          .getAllTransactions()
          .call();
        console.log(getAllTransactions);
        // const transactionsCount =
        //   await transactionsContract.getTransactionCount();
        // setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        setformData,
        sendTransaction,
        handleChange,
        formData,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
