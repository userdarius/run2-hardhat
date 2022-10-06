const { assert, expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleStorage", function () {
	let simpleStorageFactory;
	let simpleStorage;

	beforeEach(async function () {
		simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
		simpleStorage = await simpleStorageFactory.deploy();
	});

	it("Should start with 0", async function () {
		const currentValue = await simpleStorage.retrieve();
		const exepectedValue = "0";
		assert.equal(currentValue.toString(), exepectedValue);
		// expect(currentValue.toString()).to.equal(exepectedValue);
	});

	it("Should set the value to 10", async function () {
		const currentValue = await simpleStorage.store(10);
		const exepectedValue = "10";
		await currentValue.wait(1);
		const currentValue10 = await simpleStorage.retrieve();
		assert.equal(currentValue10.toString(), exepectedValue);
	});

	/*it("Should return the new value once it's changed", async function () {
		const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
		const simpleStorage = await SimpleStorage.deploy();
		await simpleStorage.deployed();
		expect(await simpleStorage.retrieve()).to.equal(0);
		await simpleStorage.store(42);
		expect(await simpleStorage.retrieve()).to.equal(42);
	});*/
});
