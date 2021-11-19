import React, { FunctionComponent, useEffect, useState } from "react";
import { useMachine } from "@xstate/react";
import { createMachine, assign, actions } from "xstate";
import { useWeb3React } from "@web3-react/core";

import GenericButton from "../../elements/GenericButton/GenericButton";

import useContract from "../../../utils/useContract";
import { getNFTByID } from "../../../utils/functions";
import { ethers } from "ethers";

import type { BigNumber } from "@ethersproject/contracts/node_modules/@ethersproject/bignumber";

interface MintFlowProps {}

interface MintFlowMachineContext {
	nftURL: null | string;
}

const mintFlowMachine = createMachine<MintFlowMachineContext>({
	id: "mintFlow",
	context: {
		nftURL: null,
	},
	initial: "idle",
	states: {
		idle: {
			on: { START: "minting" },
		},
		minting: {
			entry: "mintNFT",
			on: {
				FETCH: "fetching",
				FAILURE: "failed",
			},
		},
		fetching: {
			entry: "fetchNFT",
			on: {
				SUCCESS: "success",
				FAILURE: "failed",
			},
		},
		success: {
			entry: "fetchNFT",
			type: "final",
		},
		failed: {
			type: "final",
		},
	},
});

const MintFlow: FunctionComponent<MintFlowProps> = () => {
	const web3React = useWeb3React();
	const [contract, setContract] = useState<any | null>(null);

	useEffect(() => {
		if (web3React.active && web3React.library) {
			const signer = web3React.library.getSigner();
			const NFTContract = useContract(signer);
			setContract(NFTContract);
		}
	}, [web3React.active, web3React.library]);

	const [state, send] = useMachine(mintFlowMachine, {
		actions: {
			mintNFT: async (context, event) => {
				if (contract) {
					console.log("Minting NFT");
					const tx = await contract
						.mint({
							value: ethers.utils.parseUnits("0.02"),
						})
						.catch((err: Error) => {
							console.log(err);
							send("FAILURE");
						});

					if (!tx) {
						return;
					}

					const data = await tx.wait();

					if (data) {
						send("FETCH");
					}
				} else {
					send("FAILURE");
				}
			},
			fetchNFT: async (context, event) => {
				try {
					const totalTokens = await contract
						.balanceOf(web3React.account)
						.then((data: BigNumber) => {
							return data.toNumber();
						});

					const tokenId = await contract
						.tokenOfOwnerByIndex(web3React.account, totalTokens - 1)
						.then((results: BigNumber) => {
							return results.toNumber();
						});

					if (!tokenId) {
						send("FAILURE");
					}

					const tokenMeta = await getNFTByID(tokenId).catch((err) => {
						send("FAILURE");
						return;
					});

					if(tokenMeta?.image) {
						context.nftURL = tokenMeta.image;
						send("SUCCESS");
					} else {
						send("FAILURE");
					}


				} catch (error) {
					send("FAILURE");
				}
			},
		},
	});

	if (state.value === "idle") {
		return (
			<>
				<h2 className="text-lg font-bold mb-2">Click here to mint your NFT</h2>
				<GenericButton onClick={() => send("START")}>Mint NFT</GenericButton>
			</>
		);
	}

	if (state.value === "minting" || state.value === "fetching") {
		return (
			<>
				<h2 className="text-lg font-bold mb-2">Fetching your NFT</h2>
			</>
		);
	}

	if (state.value === "success") {
		return (
			<>
				<h2>Here's your NFT!</h2>
				{state.context.nftURL && <img src={state.context.nftURL} alt="" />}
			</>
		);
	}

	if (state.value === "failed") {
		return (
			<>
				<h2>Something went Wrong!</h2>
				<p>Reload to try Again</p>
			</>
		);
	}

	return null;
};

export default MintFlow;
