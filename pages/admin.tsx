import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";

import GenericButton from "../components/elements/GenericButton/GenericButton";
import ShortAddress from "../components/elements/ShortAddress/ShortAddress";

import getContract from "../utils/getContract";
import useETHPrice from "../utils/useETHPrice";
import { AdminData, getAdminData } from "../utils/functions";

import type { NextPage } from "next";
import type { Contract } from "@ethersproject/contracts";

interface Recipient {
	address?: string;
	share?: string;
}

interface PayoutObj {
	you: Recipient;
	p1: Recipient;
	p2: Recipient;
	gasUsed: string;
	gasPrice: string;
	gasCost: string;
}

const Admin: NextPage = () => {
	const [ETHprice, error] = useETHPrice();
	const [data, setData] = useState<null | AdminData>(null);
	const [contract, setContract] = useState<Contract | null>(null);
	const [tokenURI, setTokenURI] = useState<string>("");
	const [payouts, setPayouts] = useState<PayoutObj | null>(null);

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

	useEffect(() => {
		if (data && contract && web3React.account) {
			let isPayoutRecipient = [data.owner, data.p1, data.p2].includes(web3React.account);
			if (isPayoutRecipient) {
				getPayoutsData(contract).then(setPayouts);
			}
		}
	}, [data, contract]);

	function withdrawFunds() {
		if (contract) {
			contract
				.withdraw()
				.then((results: any) => {
					console.log(ethers.utils.formatEther(results));
				})
				.catch((err: Error) => {
					console.log(err);
				});
		}
	}

	async function getPayoutsData(contract: Contract) {
		let gasUsed = await contract.estimateGas.withdraw();
		let gasPrice = await contract.provider.getGasPrice();
		let gasCost = gasUsed.mul(gasPrice);

		let contractBalance = Number(data?.balance);
		let eachShare = contractBalance / 3;
		let feeShare = Number(ethers.utils.formatEther(gasCost)) / 3;

		if (feeShare >= eachShare) {
			eachShare = 0;
			feeShare = 0;
		}

		let payoutRecipients = [data?.owner, data?.p1, data?.p2];

		var index = payoutRecipients.indexOf(web3React.account as string);
		if (index !== -1) {
			payoutRecipients.splice(index, 1);
		}

		let [p1, p2] = payoutRecipients;

		return {
			you: {
				address: web3React.account,
				share: (eachShare + 2 * feeShare).toFixed(4),
			},
			p1: {
				address: p1,
				share: (eachShare - feeShare).toFixed(4),
			},
			p2: {
				address: p2,
				share: (eachShare - feeShare).toFixed(4),
			},
			gasUsed: gasUsed.toString(),
			gasPrice: ethers.utils.formatUnits(gasPrice, "gwei").toString(),
			gasCost: ethers.utils.formatEther(gasCost).toString(),
		};
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
					setTokenURI("There was an error fetching the tokenURI");
				});
		}
	}

	return (
		<div>
			{data && (
				<ul>
					{ETHprice && (
						<li>
							<strong>ETH:</strong> ${ETHprice}
						</li>
					)}
					<li>
						<strong>Contract Owner:</strong> {data.owner}
					</li>
					<li>
						<strong>Contract Address:</strong> {contract?.address}
					</li>
					<li>
						<strong>NFT Price:</strong>{" "}
						<span>{`${data.nftPrice} ${ethers.constants.EtherSymbol}`}</span>
						{ETHprice && (
							<span className="ml-2">
								(${(Number(data.nftPrice) * Number(ETHprice)).toFixed(2)})
							</span>
						)}
					</li>
					<li>
						<strong>NFTs Minted:</strong> {`${data.totalSupply} of ${data.maxSupply}`}
					</li>
					<li>
						<strong>Contract Balance:</strong>{" "}
						<span>{`${data.balance} ${ethers.constants.EtherSymbol}`}</span>
						{ETHprice && (
							<span className="ml-2">
								(${(Number(data.balance) * Number(ETHprice)).toFixed(2)})
							</span>
						)}
					</li>
				</ul>
			)}

			<div className="flex flex-col gap-1 mt-4">
				<p>
					<strong>Get token URI</strong>
				</p>
				<form className="flex items-stretch gap-2" action="" onSubmit={getTokenURI}>
					<p className="self-center">Token ID:</p>
					<input className="border p-2" name="tokenID" type="text" />
					<GenericButton type="submit">Go</GenericButton>
				</form>
				{tokenURI && <p>{tokenURI}</p>}
			</div>

			{payouts && (
				<div className="mt-4">
					<p>
						<h1 className="text-4xl font-black">Payouts</h1>
					</p>

					<div className="flex row gap-1 max-w-xl my-4">
						<div className="flex flex-col bg-green-600 text-white border rounded-2xl p-4 items-center flex-1">
							<p className="text-xl font-bold mb-2">Payout #1 (You)</p>
							<ShortAddress address={payouts.you.address} />
							<p>{payouts.you.share}</p>
							{ETHprice && (
								<span className="ml-2">
									(${(Number(payouts.you.share) * Number(ETHprice)).toFixed(2)})
								</span>
							)}
						</div>
						<div className="flex flex-col bg-green-600 text-white border rounded-2xl p-4 items-center flex-1">
							<p className="text-xl font-bold mb-2">Payout #2</p>
							<ShortAddress address={payouts.p1.address} />
							<p>{payouts.p1.share}</p>
							{ETHprice && (
								<span className="ml-2">
									(${(Number(payouts.p1.share) * Number(ETHprice)).toFixed(2)})
								</span>
							)}
						</div>
						<div className="flex flex-col bg-green-600 text-white border rounded-2xl p-4 items-center flex-1">
							<p className="text-xl font-bold mb-2">Payout #3</p>
							<ShortAddress address={payouts.p2.address} />
							<p>{payouts.p2.share}</p>
							{ETHprice && (
								<span className="ml-2">
									(${(Number(payouts.p2.share) * Number(ETHprice)).toFixed(2)})
								</span>
							)}
						</div>
					</div>

					<GenericButton onClick={withdrawFunds}>Withdraw ETH</GenericButton>
					<ul>
						<li className="mr-2">Gas Used: {payouts.gasUsed}</li>
						<li className="mr-2">Gas Price: {payouts.gasPrice}</li>
						<li className="mr-2">
							Gas Cost: {payouts.gasCost}
							{ETHprice && (
								<span className="ml-2">
									(${(Number(payouts.gasCost) * Number(ETHprice)).toFixed(2)})
								</span>
							)}
						</li>
					</ul>
				</div>
			)}
		</div>
	);
};

export default Admin;
