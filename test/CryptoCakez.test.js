const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");

async function getContract() {
	const CryptoCakez = await ethers.getContractFactory("CryptoCakez");
	const contract = await CryptoCakez.deploy();

	return contract;
}

describe("CryptoCakez", function () {
	it("Should return correct price value", async function () {
		const contract = await getContract();

		const price = await contract.PRICE();

		expect(ethers.BigNumber.isBigNumber(price)).to.equal(true);
		expect(price).to.equal("20000000000000000");
	});

	it("Should return correct max supply value", async function () {
		const contract = await getContract();

		const maxSupply = await contract.MAX_SUPPLY();

		expect(ethers.BigNumber.isBigNumber(maxSupply)).to.equal(true);
		expect(maxSupply).to.equal("2000");
	});

	it("Should return correct name", async function () {
		const contract = await getContract();

		const name = await contract.name();
		expect(name).to.equal("CryptoCakez");
	});

	it("Should return correct symbol", async function () {
		const contract = await getContract();

		const symbol = await contract.symbol();
		expect(symbol).to.equal("CAKEZ");
	});

	it("Total supply starts at 0 and increments with mint", async function () {
		const contract = await getContract();

		const totalSupply1 = await contract.totalSupply();
		expect(totalSupply1).to.equal(0);

		await contract.mint({
			value: ethers.utils.parseUnits("0.02"),
		});

		const totalSupply2 = await contract.totalSupply();
		expect(totalSupply2).to.equal(1);
	});

	it("Attempting to mint without sending ETH fails", async function () {
		const contract = await getContract();

		expect(contract.mint()).to.be.revertedWith("Incorrect ETH value");
	});

	it("Attempting to mint with insufficient ETH fails", async function () {
		const contract = await getContract();

		expect(
			contract.mint({
				value: ethers.utils.parseUnits("0.01"),
			})
		).to.be.revertedWith("Incorrect ETH value");
	});

	it("Attempting to mint with too much ETH fails", async function () {
		const contract = await getContract();

		expect(
			contract.mint({
				value: ethers.utils.parseUnits("0.03"),
			})
		).to.be.revertedWith("Incorrect ETH value");
	});

	it("Returns the correct tokeURI", async function () {
		const contract = await getContract();

		await contract.mint({
			value: ethers.utils.parseUnits("0.02"),
		});

		const tokenURI1 = await contract.tokenURI(0);
		expect(tokenURI1).to.equal("https://cryptocakez.vercel.app/api/nft/0");

		await contract.mint({
			value: ethers.utils.parseUnits("0.02"),
		});

		const tokenURI2 = await contract.tokenURI(1);
		expect(tokenURI2).to.equal("https://cryptocakez.vercel.app/api/nft/1");
	});

	it("Minting NFTs adds to contact balance", async function () {
		const [deployer, ETH1, ETH2, minter] = await ethers.getSigners();

		//Deploy contract; Deployer pays fee
		const contract = await getContract();

		//Mint NFTs to add ETH to contract balance; Minter pays fee
		const minterContract = contract.connect(minter);
		for (let index = 0; index < 6; index++) {
			await minterContract.mint({
				value: ethers.utils.parseUnits("0.02"),
			});
		}

		//Get Contract value
		const contractBalance = await waffle.provider.getBalance(contract.address);
		expect(ethers.utils.formatEther(contractBalance)).to.equal("0.12");
	});

	// it("Write tests for withdrawals", async function () {
	// const [deployer, ETH1, ETH2, minter] = await ethers.getSigners();

	// //Deploy contract; Deployer pays fee
	// const contract = await getContract();

	// //Mint NFTs to add ETH to contract balance; Minter pays fee
	// const minterContract = contract.connect(minter);
	// for (let index = 0; index < 6; index++) {
	// 	await minterContract.mint({
	// 		value: ethers.utils.parseUnits("0.02"),
	// 	});
	// }

	// //Get Contract value
	// const contractBalance = await waffle.provider.getBalance(contract.address);
	// expect(ethers.utils.formatEther(contractBalance)).to.equal("0.12");

	// let ETH1Bal = await ETH1.getBalance();
	// expect(ethers.utils.formatEther(ETH1Bal)).to.equal("10000.0");
	// let ETH2Bal = await ETH2.getBalance();
	// expect(ethers.utils.formatEther(ETH2Bal)).to.equal("10000.0");

	// //deployer calls withdraw
	// await contract.withdraw();

	// //ETH1 and ETH2 should have 0.04 more ETH
	// ETH1Bal = await ETH1.getBalance();
	// expect(ethers.utils.formatEther(ETH1Bal)).to.equal("10000.04");
	// ETH2Bal = await ETH2.getBalance();
	// expect(ethers.utils.formatEther(ETH2Bal)).to.equal("10000.04");

	// expect(false).to.be(true);
	// });
});
