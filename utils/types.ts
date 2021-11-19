import { Query } from "firebase/firestore";

export interface NFTMetaData {
	seed: string;
	image: string;
}

export interface GetNFTResponse {
	nfts: NFTMetaData[],
	nextQuery: Query | null,
	prevQuery: Query | null,
	firstID: string | null
}
