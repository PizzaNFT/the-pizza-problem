import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import { expect } from "chai";


const pizzaObj = 
  {
  "dough": "thin",
  "flavour": [
    "calabresa",
    "frango"
  ],
  "extra": [
    "cebola",
    "bacon"
  ]
};


describe("PizzaNFT", function() {
  let accounts: Signer[];
  let contract: Contract;
  let ownerAddress: String;
  let b64Pizza = btoa(JSON.stringify(pizzaObj));


  beforeEach(async function () {
    accounts = await ethers.getSigners();
    ownerAddress = await accounts[0].getAddress();
    const PizzaContract: ContractFactory = await ethers.getContractFactory(
      "PizzaToken"
    );

    contract = await PizzaContract.deploy();
    await contract.deployed();
  });

  it("Should be able to mint new tokens", async function () {
    contract.safeMint(accounts[1].getAddress(), b64Pizza)
  });

  it("Should be able to burn tokens", async function () {});

  it("Should decode to a valid pizza object", async function () {});

  it("Should return the owner of a token", async function () {});

  it("Should not return a burned token", async function () {});

  it("Should not allow transfer from unnaproved sender", async function () {});

});
