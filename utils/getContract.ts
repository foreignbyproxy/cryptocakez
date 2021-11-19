import { ethers } from "ethers";
import contractArtifact from "../artifacts/contracts/CryptoCakez.sol/CryptoCakez.json";

import { Contract } from "@ethersproject/contracts";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

let nftContract: Contract | null = null;

function getContract(provider: any) {
	if (nftContract) {
		return nftContract;
	}

	nftContract = new ethers.Contract(contractAddress, contractArtifact.abi, provider);

	return nftContract;
}

export default getContract;
