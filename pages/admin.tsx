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
		if(contract) {
			contract.withdraw().then((results: any) => {
				console.log(results);
			}).catch((err: Error) => {
				console.log(err);
			})
		}
	}


	return (
		<div>
			{data && (
				<ul>
					<li>Owner: {data.owner}</li>
					<li>Is Sale Active: {data.saleActive ? "True" : "False"}</li>
					<li>NFT Price: {`${data.nftPrice} ${ethers.constants.EtherSymbol}`}</li>
					<li>NFTs Minted: {`${data.totalSupply} of ${data.maxSupply}`}</li>
					<li>Contract Balance: {`${data.balance} ${ethers.constants.EtherSymbol}`}</li>
				</ul>
			)}

			{contract && (
				<div className="mt-4">
					<p>Withdraw Balance</p>
					<GenericButton onClick={withdrawFunds}>Withdraw ETH</GenericButton>
				</div>
			)}
		</div>
	);
};

export default Admin;
