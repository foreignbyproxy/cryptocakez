import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import GenericButton from "../components/elements/GenericButton/GenericButton";

import getContract from "../utils/getContract";
import { AdminData, getAdminData } from "../utils/functions";

import type { NextPage } from "next";
import type { Contract } from "@ethersproject/contracts";

const Admin: NextPage = () => {
	const [data, setData] = useState<null | AdminData>(null);
	const [contract, setContract] = useState<Contract | null>(null);
	const [tokenURI, setTokenURI] = useState<string>("");

	const web3React = useWeb3React();

	useEffect(() => {
		if (web3React.account && web3React.library) {
			const contract = getContract(web3React.library.getSigner());

			getAdminData(web3React, contract).then((adminData) => {
				setContract(contract);
				setData(adminData);
			});
		}
	}, [web3React]);

	function withdrawFunds() {
		if (contract) {
			contract
				.withdraw()
				.then((results: any) => {
					console.log(results);
				})
				.catch((err: Error) => {
					console.log(err);
				});
		}
	}

	function getTokenURI(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		let form = new FormData(e.currentTarget);
		let tokenID = form.get("tokenID");

		if (tokenID && contract) {
			contract
				.tokenURI(tokenID)
				.then((results: any) => {
					setTokenURI(results);
				})
				.catch((err: Error) => {
					console.log(err);
					setTokenURI('There was an error fetching the tokenURI');
				});
		}
	}

	return (
		<div>
			{data && (
				<ul>
					<li>
						<strong>Contract Owner:</strong> {data.owner}
					</li>
					<li>
						<strong>Contract Address:</strong> {contract?.address}
					</li>
					<li>
						<strong>NFT Price:</strong>{" "}
						{`${data.nftPrice} ${ethers.constants.EtherSymbol}`}
					</li>
					<li>
						<strong>NFTs Minted:</strong> {`${data.totalSupply} of ${data.maxSupply}`}
					</li>
					<li>
						<strong>Contract Balance:</strong>{" "}
						{`${data.balance} ${ethers.constants.EtherSymbol}`}
					</li>
				</ul>
			)}

			{contract && (
				<>
					<div className="flex gap-2 items-center mt-4">
						<p><strong>Withdraw Balance</strong></p>
						<GenericButton onClick={withdrawFunds}>Withdraw ETH</GenericButton>
					</div>
					<div className="flex flex-col gap-1 mt-4">
						<p><strong>Get token URI</strong></p>
						<form
							className="flex items-stretch gap-2"
							action=""
							onSubmit={getTokenURI}
						>
							<p className="self-center">Token ID:</p>
							<input className="border p-2" name="tokenID" type="text" />
							<GenericButton type="submit">Go</GenericButton>
						</form>
						{tokenURI && <p>{tokenURI}</p>}
					</div>
				</>
			)}
		</div>
	);
};

export default Admin;
