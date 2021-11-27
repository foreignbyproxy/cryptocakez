// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const dotenv = require("dotenv")
dotenv.config({
	path: ".env.local",
});

async function main() {
	console.log("Rinkeby URL:", process.env.RINKEBY_URL);

	const [deployer] = await hre.ethers.getSigners();
	console.log("Deploying contracts with the account:", deployer.address);
	console.log("Account balance:", (await deployer.getBalance()).toString());
	console.log("Network ID:", (await deployer.getChainId()).toString());

	const CryptoCakez = await hre.ethers.getContractFactory("CryptoCakez");
	const contract = await CryptoCakez.deploy();

	await contract.deployed();

	console.log("CryptoCakez deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
