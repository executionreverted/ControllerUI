import type { BigNumberish } from "@ethersproject/bignumber";
import { formatUnits } from "@ethersproject/units";

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

const ETHERSCAN_PREFIXES = {
  1: "",
  3: "ropsten.",
  4: "rinkeby.",
  5: "goerli.",
  42: "kovan.",
};

export function formatEtherscanLink(
  type: "Account" | "Transaction",
  data: [number, string]
) {
  switch (type) {
    case "Account": {
      const [chainId, address] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/address/${address}`;
    }
    case "Transaction": {
      const [chainId, hash] = data;
      return `https://${ETHERSCAN_PREFIXES[chainId]}etherscan.io/tx/${hash}`;
    }
  }
}

export const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);


export const CONTRACT_ADDRESS = "0x4b440c800d74ee797010b3a08d535d9491a1cd1b"
export const APP_CHAIN_ID = 43113
export const switchChain = async () => {
  // @ts-ignore
  await window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [{
      chainId: "0xa869",
      chainName: "Avalanche Fuji Testnet",
      nativeCurrency: {
        name: "AVAX",
        symbol: "AVAX",
        decimals: 18
      },
      rpcUrls: ["https://api.avax-test.network/ext/bc/C/rpc"],
      blockExplorerUrls: ["https://cchain.explorer.avax-test.network"]
    }]
  })
    .then(res => {
      setTimeout(() => {
        console.log('Successfully connected to c-chain...')
        location.reload()
      }, 1000)
    })
    .catch(err => {

    });
}