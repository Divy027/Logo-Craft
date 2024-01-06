import CONFIG from "../config";
import Web3 from "web3";
import {  toast } from "react-toastify";
import {  utils } from "ethers";

declare global {
    interface Window {
      ethereum?: any;
    }
  }

export const datetimeLocal = (datetime: any) => {
  let month = datetime.getMonth() + 1;
  let day = datetime.getDate();
  let hour = datetime.getHours();
  let min = datetime.getMinutes();
  const result = `${datetime.getFullYear()}-${
    month >= 10 ? month : `0${month}`
  }-${day >= 10 ? day : `0${day}`}T${hour >= 10 ? hour : `0${hour}`}:${
    min >= 10 ? min : `0${min}`
  }`;
  return result;
};

export const connectWallet = async () => {
  try {
    if (window.ethereum) {
      try {
        const chain = await window.ethereum.request({ method: "eth_chainId" });
        if (chain === CONFIG.CHAINID) {
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          console.log("addressArray", addressArray);
          if (addressArray.length > 0) {
            return {
              address: await addressArray[0],
              // status: "👆🏽 Ethereum Wallet is connected.",
            };
          } else {
            toast.error(`😥 Connect your wallet account to the site.`);
          }
        } else {
          // Case other chain connected so change zeta chain
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: CONFIG.CHAINID }],
          });
          const addressArray = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          if (addressArray.length > 0) {
            return {
              address: await addressArray[0],
            };
          }
        }
      } catch (err) {
        // No exist zeta chain in your wallet
        const networkMap = {
          // POLYGON_MAINNET: {
          //   chainId: utils.hexValue(137), // '0x89'
          //   chainName: "Matic(Polygon) Mainnet",
          //   nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
          //   rpcUrls: ["https://polygon-rpc.com"],
          //   blockExplorerUrls: ["https://www.polygonscan.com/"],
          // },
          // MUMBAI_TESTNET: {
          //   chainId: utils.hexValue(80001), // '0x13881'
          //   chainName: "Matic(Polygon) Mumbai Testnet",
          //   nativeCurrency: { name: "tMATIC", symbol: "tMATIC", decimals: 18 },
          //   rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
          //   blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
          // },
        //   Base_Mainnet: {
        //     chainId: utils.hexValue(8453), // '0x89'
        //     chainName: "Base Mainnet",
        //     nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
        //     rpcUrls: ["https://mainnet.base.org"],
        //     blockExplorerUrls: ["https://basescan.org"],
        //   },
          ZetaChain_Testnet: {
            chainId: utils.hexValue(7001), // '0x1b59'
            chainName: "ZetaChain Testnet",
            nativeCurrency: { name: "tZETA", symbol: "tZETA", decimals: 18 },
            rpcUrls: ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"],
            blockExplorerUrls: ["https://athens3.explorer.zetachain.com/"],
          }
        };

        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.ZetaChain_Testnet],
        });

        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      }
    } else {
      toast.error(
        `🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.(https://metamask.io/download.html)`
      );
    }
  } catch (error) {
    console.log("error", error);
  }
};

export const connectedChain = async (chainID: any) => {
  if(window.ethereum){
    try {
      const chain = await window.ethereum.request({ method: "eth_chainId" });
      if (chain === utils.hexValue(chainID)) {
        return true;
      } else {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: utils.hexValue(chainID)}],
        });
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
        toast.error(`error in changing the network`);
  
        return false;
      }
    } catch (error: any) {
      if(UserRejected(error.message)){
        return;
      }
      const networkMap = {
        MUMBAI_TESTNET: {
          chainId: utils.hexValue(80001),
          chainName: "Matic(Polygon) Mumbai Testnet",
          nativeCurrency: { name: "tMATIC", symbol: "tMATIC", decimals: 18 },
          rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
          blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
        },
        ZetaChain_Testnet: {
          chainId: utils.hexValue(7001),
          chainName: "ZetaChain Testnet",
          nativeCurrency: { name: "tZETA", symbol: "tZETA", decimals: 18 },
          rpcUrls: ["https://zetachain-athens-evm.blockpi.network/v1/rpc/public"],
          blockExplorerUrls: ["https://athens3.explorer.zetachain.com/"],
        },
        BNB_TESTNET: {
          chainId: utils.hexValue(97),
          chainName: "BNB Smart Chain Testnet",
          nativeCurrency: { name: "tBNB", symbol: "tBNB", decimals: 18 },
          rpcUrls: ["https://endpoints.omniatech.io/v1/bsc/testnet/public"],
          blockExplorerUrls: ["https://testnet.bscscan.com"],
        },
        BASE_TESTNET: {
          chainId: utils.hexValue(84531),
          chainName: "Base Goerli Testnet",
          nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
          rpcUrls: ["https://base-goerli.public.blastapi.io"],
          blockExplorerUrls: ["https://goerli.basescan.org"],
        },
        AVALANCHE_FUJI_TESTNET: {
          chainId: utils.hexValue(43113),
          chainName: "Avalanche Fuji Testnet",
          nativeCurrency: { name: "AVAX", symbol: "AVAX", decimals: 18 },
          rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
          blockExplorerUrls: ["https://testnet.snowtrace.io"],
        },
        SEPOLIA_TESTNET: {
          chainId: utils.hexValue(11155111),
          chainName: "Sepolia test network",
          nativeCurrency: { name: "SepoliaETH", symbol: "SepoliaETH", decimals: 18 },
          rpcUrls: ["https://sepolia.infura.io/v3/"],
          blockExplorerUrls: ["https://sepolia.etherscan.io"],
        },
      };

      if(chainID === 80001){
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.MUMBAI_TESTNET],
        });
  
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      }
      else if(chainID === 7001){
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.ZetaChain_Testnet],
        });
  
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      }
      else if(chainID === 97){
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.BNB_TESTNET],
        });
  
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      }
      else if(chainID === 84531){
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.BASE_TESTNET],
        });
  
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      }
      else if(chainID === 43113){
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.AVALANCHE_FUJI_TESTNET],
        });
  
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      }
      else if(chainID === 11155111){
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [networkMap.SEPOLIA_TESTNET],
        });
  
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (addressArray.length > 0) {
          return {
            address: await addressArray[0],
          };
        }
      }
     
      
    }
  }else{
    toast.error(
      `🦊 You must install Metamask, a virtual Ethereum wallet, in your browser.(https://metamask.io/download.html)`
    );
  }
  
};

export const getBalance = async () => {
  try {
     const web3 = new Web3(window.ethereum);
     const account: any = await localStorage.getItem(CONFIG.WALLET_ADRESS_LOCALSTORAGE)
     const balance: any = await web3.eth.getBalance(account);

    return balance / 1000000000000000000;
  } catch (error) {
    console.log("error", error);
  }
};

export const UserRejected = (error: any) => {
  if (error === "User rejected the request.") {
    toast.error("Please accept request");
    return 1;
  }else {
    return 0;
  }
};

export const LOOP = 30;
export const INTERVAL = 500;
export const delay = (ms: any) =>
  new Promise((resolve) => setTimeout(resolve, ms));