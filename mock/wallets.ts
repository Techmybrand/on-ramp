export interface Wallet {
  wallet: string
  icon: string
  connector?: string
}

export const wallets: Wallet[] = [
  // {
  //   wallet: "Tron Link",
  //   icon: "/svgs/tronlink.svg",
  //   connector: "tronlink"
  // },
  {
    wallet: "Bitkeep Wallet",
    icon: "/svgs/bitkeep.svg",
    connector: "bitkeep"
  },
  {
    wallet: "Metamask",
    icon: "/svgs/metamask.svg",
    connector: "injected"
  },
  {
    wallet: "Trust Wallet",
    icon: "/svgs/trustwallet.svg",
    connector: "trustWallet"
  },
  {
    wallet: "wallet connect",
    icon: "/svgs/walletconnect.svg",
    connector: "walletConnect"
  },
]
