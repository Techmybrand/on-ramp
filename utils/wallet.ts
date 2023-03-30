import { NETWORK_URLS } from "@/config/constants"

const NETWORK_CONFIG = {
    56: {
        chainId: 56, // hex of 56
        rpcUrls: ["https://bsc-dataseed.binance.org/"],
        name: "Binance SmartChain Mainnet",
        nativeCurrency: { name: "BNB", decimals: 18, symbol: "BNB" },
        blockExplorerUrls: ["https://bscscan.com/"],
    },
    97: {
        chainId: 97, // hex of 97
        rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
        name: "Binance SmartChain Testnet",
        nativeCurrency: { name: "BNB", decimals: 18, symbol: "BNB" },
        blockExplorerUrls: ["https://testnet.bscscan.com/"],
    }
  }
/**
 * Prompt the user to add select chain as a network on Metamask, or switch to the chain if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
 export const setupNetwork = async (externalProvider?: any) => {
    const provider = externalProvider || window.ethereum
    const chainId = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID, 10) as keyof typeof NETWORK_CONFIG
    if (!NETWORK_CONFIG[chainId]) {
      console.error('Invalid chain id')
      return false
    }
    if (provider) {
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }],
        })
        return true
      } catch (switchError) {
        if ((switchError as any)?.code === 4902) {
          try {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: `0x${chainId.toString(16)}`,
                  chainName: NETWORK_CONFIG[chainId].name,
                  nativeCurrency: NETWORK_CONFIG[chainId].nativeCurrency,
                  rpcUrls: [NETWORK_URLS[chainId]],
                  blockExplorerUrls: NETWORK_CONFIG[chainId].blockExplorerUrls,
                },
              ],
            })
            return true
          } catch (error) {
            console.error('Failed to setup the network in Metamask:', error)
            return false
          }
        }
        return false
      }
    } else {
      console.error("Can't setup network on metamask because window.ethereum is undefined")
      return false
    }
  }
  