import { Web3ReactProvider } from "@web3-react/core";
import { ethers } from "ethers";
import React from "react";

function getLibrary(provider: any, connector: any) {
	return new ethers.providers.Web3Provider(provider);
}

interface Web3ProviderProps {
	children: React.ReactNode
}

function Web3Provider({ children }: Web3ProviderProps) {
	return <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>;
}

export default Web3Provider;
