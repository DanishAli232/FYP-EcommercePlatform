export const GetUSDExchangeRate = async () => {
  var requestOptions = { method: "GET", redirect: "follow" };
  return await fetch(
    "https://api.coinbase.com/v2/exchange-rates?currency=ETH",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data.rates.USD;
    })
    .catch((error) => {
      return "error", error;
    });
};

export const GetETHExchangeRate = async () => {
  var requestOptions = { method: "GET", redirect: "follow" };
  return await fetch(
    "https://api.coinbase.com/v2/exchange-rates?currency=USD",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      return result.data.rates.ETH;
    })
    .catch((error) => {
      return "error", error;
    });
};
