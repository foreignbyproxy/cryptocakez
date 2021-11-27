import { Web3ReactContextInterface } from "@web3-react/core/dist/types";
import { ethers } from "ethers";

import type { NFTMetaData } from "./types";
import type { Contract } from "@ethersproject/contracts";
import type { BigNumber } from "@ethersproject/bignumber";

export function formatAddress(address: string) {
	return address.substr(0, 6) + "..." + address.substr(-4);
}

export interface userNFTData {
	totalTokens: number;
	tokens: NFTMetaData[];
}

export async function getUserNFTData(address: string, contract: Contract) {
	//Get the number of NFTs on the account. We need this to resolve first so we can get
	//all of the user's NFT
	const totalTokens: number = await contract.balanceOf(address).then((results: BigNumber) => {
		return results.toNumber();
	});

	//Get each of the user's NFTs
	const tokenTasks = [];
	for (let index = 0; index < totalTokens; index++) {
		tokenTasks.push(
			contract.tokenOfOwnerByIndex(address, index).then((results: BigNumber) => {
				return results.toString();
			})
		);
	}

	const allTokens = await Promise.all(tokenTasks).then((data) => {
		return Promise.all(
			data.map((tokenId) => {
				return getNFTByID(tokenId);
			})
		);
	});

	return {
		totalTokens,
		tokens: allTokens,
	} as userNFTData;
}

export interface AdminData {
	owner: string;
	saleActive: boolean;
	nftPrice: string;
	totalSupply: number;
	maxSupply: number;
	balance: string;
}

export async function getAdminData(web3React: Web3ReactContextInterface, contract: Contract) {
	const tasks = [];

	const owner = contract.owner();
	tasks.push(owner);

	const nftPrice = contract.PRICE().then((value: BigNumber) => ethers.utils.formatUnits(value));
	tasks.push(nftPrice);

	const totalSupply = contract.totalSupply().then((value: BigNumber) => value.toNumber());
	tasks.push(totalSupply);

	const maxSupply = contract.MAX_SUPPLY().then((value: BigNumber) => value.toNumber());
	tasks.push(maxSupply);

	const balance = web3React.library
		.getBalance(contract.address)
		.then((value: BigNumber) => ethers.utils.formatUnits(value));
	tasks.push(balance);

	return Promise.all(tasks).then((data) => {
		const objectKeysByIndex = [
			"owner",
			"nftPrice",
			"totalSupply",
			"maxSupply",
			"balance",
		];

		return data.reduce((accum, results, index) => {
			if (objectKeysByIndex[index]) {
				accum[objectKeysByIndex[index]] = results;
			}

			return accum;
		}, {});
	});
}

export function getNFTByID(id: string): Promise<NFTMetaData> {
	return fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/nft/${id}`, {
		method: "GET",
	}).then((res) => {
		if (res.status === 200) {
			return res.json();
		}
	});
}
