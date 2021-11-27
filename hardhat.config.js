const dotenv = require("dotenv")
dotenv.config({
	path: ".env.local",
});

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

/* List Accounts */
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.9",
	defaultNetwork: "localhost",
	networks: {
		hardhat: {
			initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
		},
		rinkeby: {
			url: process.env.RINKEBY_URL || "",
			accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
		},
	},
	gasReporter: {
		enabled: process.env.REPORT_GAS !== undefined,
		currency: "USD",
		coinmarketcap: process.env.COINMARKETCAP_API
	},
	etherscan: {
		apiKey: process.env.ETHERSCAN_API_KEY,
	},
};
