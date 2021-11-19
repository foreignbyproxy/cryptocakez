import { ethers } from "ethers";
import contractArtifact from "../artifacts/contracts/CryptoCakez.sol/CryptoCakez.json";

import { Contract } from "@ethersproject/contracts";


let nftContract: Contract | null = null;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;

function getContract(provider: any) {
	if (nftContract) {
		return nftContract;
	}

	nftContract = new ethers.Contract(contractAddress, contractArtifact.abi, provider);

	return nftContract;
}

export default getContract;
