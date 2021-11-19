import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Image from "next/image";

import FormGetNFTByID from "../components/forms/FormGetNFTByID/FormGetNFTByID";

import { getNFTByID } from "../utils/functions";

import type { NextPage } from "next";
import { NFTMetaData } from "../utils/types";

const View: NextPage = () => {
	const [nft, setNFT] = useState<NFTMetaData | null>(null);
	const router = useRouter();

	useEffect(() => {
		if(typeof router.query.tokenid === 'string') {
			getNFT(router.query.tokenid);
		}
	}, [])

	function getNFT(tokenID: string) {
		getNFTByID(tokenID).then((nft) => {
			setNFT(nft);
		})
	}

	return (
		<div className="grid gap-4 grid-cols-12 px-4 py-6 sm:px-0">
			<div
				className="col-span-8 border-4 border-dashed border-gray-200 rounded-lg p-4"
				style={{ minHeight: "600px" }}
			>
				{nft && (
					<div>
						<p className="mb-4">Seed: {nft.seed}</p>
						<Image
							src={nft.image}
							layout="responsive"
							width="240"
							height="240"
							alt=""
						/>
					</div>
				)}
			</div>
			<div className="col-span-4 border-4 border-dashed border-gray-200 rounded-lg p-4">
				<FormGetNFTByID afterSubmit={getNFT}/>
			</div>
		</div>
	);
};

export default View;
