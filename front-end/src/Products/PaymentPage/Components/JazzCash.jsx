import { Box, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../../Context/TransactionContext";
import { GetETHExchangeRate, GetUSDExchangeRate } from "../../../utils/EthApi";

const JazzCash = () => {
  const [usdExRate, setUsdExRate] = useState(0);
  const [ethExRate, setEthExRate] = useState(0);
  const [usdPrice, setUsdPrice] = useState(0.2);

  const {
    currentAccount,
    connectWallet,
    handleChange,
    sendTransaction,
    formData,
    setformData,
    isLoading,
  } = useContext(TransactionContext);

  const getapis = async () => {
    let eth;
    await GetUSDExchangeRate().then((res) => {
      setUsdExRate(parseFloat(res));
      console.log("usd", parseFloat(res));
    });
    await GetETHExchangeRate().then(async (res) => {
      setEthExRate(parseFloat(res));
      eth = parseFloat(res);
      console.log("eth", parseFloat(res));
    });
    let usd = 1;
    let data = eth * usd;
    console.log(data);
    setformData({
      ...formData,
      amount: data,
      receiver: "0x366e17B45eD34cC7964B15B90Bc5bFC9a38A735D",
    });
  };

  useEffect(() => {
    getapis();
  }, []);

  const checkForm = () => {
    // const {
    //   reciever: _receiver,
    //   amount,
    //   sendername: _sendername,
    //   storename: _productname,
    // } = formData;
    // if ((!_receiver && !amount && !_sendername && !_productname)) {
    //   console.log("Empty Form Data");
    // }
    sendTransaction();
  };

  return (
    <div>
      {!currentAccount ? (
        <Box
          sx={{
            backgroundColor: "#ededed",
            marginTop: "10px",
            height: "85px",
            padding: "10px 20px",
            width: "93%",
          }}
        >
          <Button
            sx={{
              backgroundColor: "#f0353b",
              color: "white",
              width: "98%",
              height: "44px",
              marginTop: "19px",
              "&:hover": {
                backgroundColor: "#d90429",
              },
            }}
            onClick={connectWallet}
          >
            <p className='text-white text-base font-semibold'>Connect Wallet</p>
          </Button>
        </Box>
      ) : (
        // <Button
        //   sx={{
        //     backgroundColor: "#f0353b",
        //     color: "white",
        //     width: "98%",
        //     height: "44px",
        //     marginTop: "19px",
        //     "&:hover": {
        //       backgroundColor: "#d90429",
        //     },
        //   }}
        //   onClick={connectWallet}
        // >
        //   <p className='text-white text-base font-semibold'>Connect Wallet</p>
        // </Button>
        <Box
          sx={{
            marginTop: "21px",
            background: "#ededed",
            padding: "19px",
            width: "95%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              marginBottom: "20px",
            }}
          >
            <TextField
              sx={{
                marginBottom: "20px",
              }}
              label='Your Name'
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.sendername}
              name='sendername'
              // helperText={error.email}
              // error={!!error.email}
              variant='standard'
            />
            <TextField
              sx={{
                marginBottom: "20px",
              }}
              label='Store Name'
              onChange={(e) => {
                handleChange(e);
              }}
              value={formData.storename}
              name='storename'
              // helperText={error.email}
              // error={!!error.email}
              variant='standard'
            />
            <TextField
              sx={{
                marginBottom: "20px",
              }}
              aria-readonly
              label='Amount'
              // onChange={(e) => {
              //   handlePriceUSD(e);
              // }}
              value={usdPrice}
              name='amount'
              // helperText={error.email}
              // error={!!error.email}
              variant='standard'
            />
            <h3>Your Etherium</h3>
            <p> {ethExRate * usdPrice} ETH</p>
            <TextField
              sx={{
                marginBottom: "20px",
              }}
              aria-readonly
              label='Receiver'
              // onChange={(e) => {
              //   handleChange(e);
              // }}
              value={formData.receiver}
              name='receiver'
              // helperText={error.email}
              // error={!!error.email}
              variant='standard'
            />
            <TextField
              sx={{
                marginBottom: "20px",
              }}
              aria-readonly
              label='Your Address'
              value={currentAccount}
              // helperText={error.email}
              // error={!!error.email}
              variant='standard'
            />
          </Box>
          <Button
            sx={{
              backgroundColor: "#f0353b",
              color: "white",
              width: "100%",
              "&:hover": {
                backgroundColor: "#d90429",
              },
            }}
            onClick={checkForm}
          >
            Send Amount
          </Button>
        </Box>
      )}
    </div>
  );
};

export default JazzCash;
