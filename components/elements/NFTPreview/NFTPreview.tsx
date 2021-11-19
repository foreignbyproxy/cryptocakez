import React, { FunctionComponent } from "react";

import { NFTMetaData } from "../../../utils/types";

interface NFTPreviewProps {
	nft: NFTMetaData;
}

const NFTPreview: FunctionComponent<NFTPreviewProps> = ({ nft }) => {
	return (
		<div className="border p-4 rounded-lg shadow-md">
			<img src={nft.imageURL} alt="" />
			<p>{nft.description}</p>
			<p>TokenId: {nft.id}</p>
			<ul>
				<li>{nft.var1}</li>
				<li>{nft.var2}</li>
				<li>{nft.var3}</li>
			</ul>
		</div>
	);
};

export default NFTPreview;
