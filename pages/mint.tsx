import React from "react";
import Image from "next/image";
import { useWeb3React } from "@web3-react/core";

import Web3Connector from "../components/elements/Web3Connector/Web3Connector";
import MintFlow from "../components/elements/MintFlow/MintFlow";

import walletImage from "../assets/img/wallet.png";

import type { NextPage } from "next";

const Mint: NextPage = () => {
	const Web3Context = useWeb3React();

	return (
		<div
			className="flex flex-col justify-center items-center max-w-lg p-4 border border-gray-300 rounded-md shadow-lg"
			style={{ minHeight: "24rem" }}
		>
			{Web3Context.account && Web3Context.active ? (
				<MintFlow />
			) : (
				<>
					<Image width="150" height="150" src={walletImage} alt=""/>
					<h2 className="text-lg font-bold mb-2">Connect your wallet to start</h2>
					<Web3Connector />
				</>
			)}
		</div>
	);
};

export default Mint;
