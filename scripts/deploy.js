// imports
const { ethers, run, network } = require("hardhat");

//async main
async function main() {
	const SimpleStorageFactory = await ethers.getContractFactory(
		"SimpleStorage"
	);

	console.log("Deploying SimpleStorage...");
	const simpleStorage = await SimpleStorageFactory.deploy();

	await simpleStorage.deployed();

	console.log(`SimpleStorage deployed to: ${simpleStorage.address}`);
	console.log(network.config);

	// We verify the contract on Etherscan
	if (network.config.chainId == 5 && process.env.ETHERSCAN_API_KEY) {
		await simpleStorage.deployTransaction.wait(6);
		await verify(simpleStorage.address, []);
	}
	// We check the current value
	const currentValue = await simpleStorage.retrieve();
	console.log("Current value: ", currentValue.toString());

	// Set the value to 10
	console.log("Setting value to 10...");
	const setValueTx = await simpleStorage.store(10);
	await setValueTx.wait();
	console.log(
		"Updated value set to: ",
		(await simpleStorage.retrieve()).toString()
	);
}

async function verify(contractAddress, args) {
	console.log("Verifying contract...");
	try {
		await run("verify:verify", {
			address: contractAddress,
			constructorArguments: args,
		});
	} catch (error) {
		if (error.message.toLowerCase().includes("already verified")) {
			console.log("Already verified");
		} else {
			console.log(error);
		}
	}
}

// main
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
