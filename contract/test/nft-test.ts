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
  let baseURI = "https://pizzatoken.pizza/"


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
    await contract.safeMint(accounts[1].getAddress(), b64Pizza);
    expect(await contract.balanceOf(accounts[1].getAddress())).to.be.equal(1);
  });

  it("Should be able to burn tokens after approval is given", async function () {
    await contract.safeMint(accounts[1].getAddress(), b64Pizza);
    await contract.connect(accounts[1]).approve(ownerAddress, 0);
    expect(await contract.burn(0)).to.be.ok;
    expect(await contract.balanceOf(accounts[1].getAddress())).to.be.equal(0);

  });

  it("Should decode to a valid pizza object", async function () {
    await contract.safeMint(accounts[1].getAddress(), b64Pizza);
    let TokenURI : string = await contract.tokenURI(0);
    expect(atob(TokenURI.replace(baseURI, ''))).to.be.equal(JSON.stringify(pizzaObj));
  });

  it("Should return the owner of a token", async function () {
    await contract.safeMint(accounts[1].getAddress(), b64Pizza);
    let owner = await contract.ownerOf(0);
    expect(owner).to.be.equal(await accounts[1].getAddress());
  });

  it("Should not return a burned token", async function () {
    await contract.safeMint(accounts[1].getAddress(), b64Pizza);
    await contract.connect(accounts[1]).approve(ownerAddress, 0);
    await contract.burn(0);
    expect(contract.ownerOf(0)).to.be.revertedWith("ERC721: owner query for nonexistent token");

  });

  it("Should not allow transfer from unnaproved sender", async function () {
    await contract.safeMint(accounts[1].getAddress(), b64Pizza);
    expect(contract.connect(accounts[2]).transferFrom(accounts[1].getAddress(),accounts[0].getAddress(), 0)).to.be.revertedWith('ERC721: transfer caller is not owner nor approved')

  });

});
