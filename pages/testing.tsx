import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import GenericButton from "../components/elements/GenericButton/GenericButton";
import { ethers } from "ethers";

import useContract from "../utils/useContract";

import type { NextPage } from "next";

const Testing: NextPage = () => {
	const web3React = useWeb3React();
	const [contract, setContract] = useState<any | null>(null);

	const [balance, setBalance] = useState<any | null>(null);
	const [saleStatus, setSaleStatus] = useState<any | null>(null);
	const [price, setPrice] = useState<any | null>(null);
	const [owner, setOwner] = useState<any | null>(null);
	const [tokenURI, setTokenURI] = useState<any | null>(null);

	const [ens, setENS] = useState<any | null>(null);

	useEffect(() => {
		if (web3React.active && web3React.library) {
			const signer = web3React.library.getSigner();
			const NFTContract = useContract(signer);
			setContract(NFTContract);

			getENSInfo(web3React.library);
		}
	}, [web3React.active, web3React.library]);

	async function getENSInfo(provider: any) {
		//ENS
		const ENSresolver = await provider.getResolver("ggerard.eth");
		const ensName = await provider.lookupAddress("0xEdDc51C2f2B5eF388430FD2B95cDCBe95226058C");
		const address = await provider.resolveName("ggerard.eth");

		const btcAddr = await ENSresolver.getAddress(0);
		const ethAddr = await ENSresolver.getAddress(60);

		const contentHash = await ENSresolver.getContentHash();
		const email = await ENSresolver.getText("email");
		const url = await ENSresolver.getText("url");

		setENS({
			ensName,
			address,
			btcAddr,
			ethAddr,
			contentHash,
			email,
			url,
		});
	}

	return (
		<div className="flex row gap-4">
			<ul>
				<li>
					<h2 className="text-xl">Get Info</h2>
				</li>
				<li>
					<p>Contract Balance: {balance}</p>
					<GenericButton
						theme="primary"
						onClick={() => {
							if (web3React.library) {
								web3React.library
									.getBalance("0x5FbDB2315678afecb367f032d93F642f64180aa3")
									.then((data: any) => {
										let priceInETH = ethers.utils.formatUnits(data, "ether");
										setBalance(`${priceInETH} ETH`);
									});
							}
						}}
					>
						Get Contract Balance
					</GenericButton>
				</li>
				<li>
					<p>Sale Status: {String(saleStatus)}</p>
					<GenericButton
						theme="primary"
						onClick={() => {
							if (contract.isSaleActive) {
								contract.isSaleActive().then((data: any) => {
									setSaleStatus(data);
								});
							}
						}}
					>
						Get Sale Status
					</GenericButton>
				</li>

				<li>
					<p>Price: {price}</p>
					<GenericButton
						theme="primary"
						onClick={() => {
							if (contract.getPrice) {
								contract.getPrice().then((data: any) => {
									let priceInETH = ethers.utils.formatUnits(data, "ether");
									setPrice(`${priceInETH} ETH`);
								});
							}
						}}
					>
						Get Price
					</GenericButton>
				</li>

				<li>
					<p>Owner: {owner}</p>
					<GenericButton
						theme="primary"
						onClick={() => {
							if (contract.owner) {
								contract.owner().then((data: any) => {
									setOwner(data);
								});
							}
						}}
					>
						Get Owner
					</GenericButton>
				</li>

				<li>
					<p>(Fix) TokenURI: {tokenURI}</p>
					<GenericButton
						theme="primary"
						onClick={() => {
							if (contract.tokenURI) {
								contract.tokenURI(1).then((data: any) => {
									setTokenURI(data);
								});
							}
						}}
					>
						Get Token URI
					</GenericButton>
				</li>
			</ul>

			<ul>
				<li>
					<h2 className="text-xl">Set Info</h2>
				</li>
				<li>
					<GenericButton
						theme="primary"
						onClick={() => {
							if (contract.flipSaleStatus) {
								contract.flipSaleStatus().then((data: any) => {
									debugger;
								});
							}
						}}
					>
						Flip Sale Status
					</GenericButton>
				</li>

				<li>
					<GenericButton
						theme="primary"
						onClick={() => {
							if (contract.setPrice) {
								let priceInETH = ethers.utils.parseEther("0.05");
								debugger;

								contract.setPrice(priceInETH).then((data: any) => {
									debugger;
								});
							}
						}}
					>
						Set Price
					</GenericButton>
				</li>
				<li>
					<GenericButton theme="primary" onClick={() => {}}>
						Withdraw
					</GenericButton>
				</li>
			</ul>

			{ens && (
				<ul>
					<li>ENS: {ens.ensName}</li>
					<li>Address: {ens.address}</li>
					<li>BTC Address: {ens.btcAddr}</li>
					<li>ETH Address: {ens.ethAddr}</li>
					<li>Content Hash: {ens.contentHash}</li>
					<li>Email: {ens.email}</li>
					<li>URL: {ens.url}</li>
				</ul>
			)}
		</div>
	);
};

export default Testing;
