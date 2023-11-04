let isMetamaskConnected = false;
function connectToMetaMask() {
  if (typeof window.ethereum === "undefined")
    return console.log("Please install MetaMask.");
  return ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(() => {
      console.log('MetaMask connected');
      isMetamaskConnected = true;
    })
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
      isMetamaskConnected = false;
    });
}
// connectToMetaMask();
async function checkUSDCBalance(ethAddress) {
  try {
    if (!isMetamaskConnected) {
      await connectToMetaMask();
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const usdcContractAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"; // USDC contract address on Ethereum mainnet
    const usdcContract = new ethers.Contract(usdcContractAddress, ["function balanceOf(address) view returns (uint256)"], provider);
    const balance = await usdcContract.balanceOf(ethAddress);
    return balance;
  } catch (e) {
    console.log(e);
  }
}

async function checkUSDTBalance(ethAddress) {
  try {
    if (!isMetamaskConnected) {
      await connectToMetaMask();
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const usdtContractAddress = "0xdac17f958d2ee523a2206206994597c13d831ec7"; // USDT contract address on Ethereum mainnet
    const usdtContract = new ethers.Contract(usdtContractAddress, ["function balanceOf(address) view returns (uint256)"], provider);
    const balance = await usdtContract.balanceOf(ethAddress);
    return balance;
  } catch (e) {
    console.log(e);
  }
}