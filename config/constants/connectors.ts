import { BitkeepConnector } from "@/bitkeep-connector/src";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { CHAIN_ID, NETWORK_URLS } from ".";

const supportedChainIds = [97]
const injected = new InjectedConnector({
  supportedChainIds
});
export const bitkeep = new BitkeepConnector({});
const walletconnect = new WalletConnectConnector({
  supportedChainIds,
  rpc: NETWORK_URLS,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

const walletlink = new WalletLinkConnector({
  url: NETWORK_URLS[CHAIN_ID],
  appName: "fusion-protocol"
});

export const connectors = {
  injected,
  bitkeep,
  walletConnect: walletconnect,
  coinbase: walletlink,
  trustWallet: injected,
};
