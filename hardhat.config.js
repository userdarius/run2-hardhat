require("@nomicfoundation/hardhat-toolbox");
//require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("./tasks/accounts");
require("hardhat-gas-reporter");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL =
	process.env.GOERLI_RPC_URL ||
	"https://eth-goerli.alchemyapi.io/v2/your-api-key";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "your-private-key";
const ETHERSCAN_API_KEY =
	process.env.ETHERSCAN_API_KEY || "your-etherscan-api-key";
const COINMARKETCAP_API_KEY =
	process.env.COINMARKETCAP_API_KEY || "your-coinmarketcap-api-key";

module.exports = {
	defaultNetwork: "hardhat", // (automatically comes with a rpc url and fake private keys)
	networks: {
		goerli: { url: GOERLI_RPC_URL, accounts: [PRIVATE_KEY], chainId: 5 },
		localhost: { url: "http://127.0.0.1:8545/", chainId: 31337 },
	},
	solidity: "0.8.17",
	etherscan: {
		apiKey: ETHERSCAN_API_KEY,
	},
	gasReporter: {
		enabled: true,
		outputFile: "gas-report.txt",
		noColors: true,
		currency: "USD",
		coinmarketcap: COINMARKETCAP_API_KEY,
		//token: "MATIC",
	},
};
