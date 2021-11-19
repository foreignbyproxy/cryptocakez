import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Image from 'next/image';

import getContract from "../utils/getContract";
import { userNFTData, getUserNFTData } from "../utils/functions";

import type { NextPage } from "next";

const Gallery: NextPage = () => {
	const [userData, setUserData] = useState<null | userNFTData>(null);
	const web3React = useWeb3React();

	useEffect(() => {
		if (web3React.account && web3React.library) {
			const signer = web3React.library.getSigner();
			const contract = getContract(signer);

			if (contract) {
				getUserNFTData(web3React.account, contract).then((newUserData) => {
					setUserData(newUserData);
				});
			}
		}
	}, [web3React.account, web3React.library]);

	return (
		<div>
			{userData && (
				<ul>
					<li>Total Tokens: {userData.totalTokens}</li>
					<li className="flex flex-wrap gap-2">
						{!!userData.tokens.length && userData.tokens.map((nft) => {
							return <Image key={`token-${nft.seed}`} src={nft.image} width="250" height="250" alt={`Token: ${nft.seed}`} />
						})}
					</li>
				</ul>
			)}
		</div>
	);
};

export default Gallery;
