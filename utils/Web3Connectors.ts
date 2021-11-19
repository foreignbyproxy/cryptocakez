import { InjectedConnector } from "@web3-react/injected-connector";

export enum ConnectorNames {
	Injected = "Injected",
}

const RPC_URLS: { [chainId: number]: string } = {
	1: `https://mainnet.infura.io/v3/901e731239a5413d9ca969b8aacdfacd`,
	3: `https://ropsten.infura.io/v3/901e731239a5413d9ca969b8aacdfacd`,
	4: `https://rinkeby.infura.io/v3/901e731239a5413d9ca969b8aacdfacd`,
	31337: `http://127.0.0.1:8545/`,
};

export const injected = new InjectedConnector({ supportedChainIds: [4, 31337] });

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
	[ConnectorNames.Injected]: injected
};
