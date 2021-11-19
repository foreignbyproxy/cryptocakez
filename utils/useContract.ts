import { ethers } from "ethers";
import contractArtifact from "../artifacts/contracts/CryptoCakez.sol/CryptoCakez.json";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function useContract(provider: any) {
	const contract = new ethers.Contract(contractAddress, contractArtifact.abi, provider);

	return contract;
}

export default useContract;
