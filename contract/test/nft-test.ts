import { ethers } from "hardhat";
import { Contract, ContractFactory, Signer } from "ethers";
import { expect } from "chai";

const pizzaObj =
{
  "dough": "thin",
  "topping": [
    "pepperoni",
    "margherita"
  ],
  "extras": [
    "onions",
    "bacon"
  ]
};

describe("PizzaNFT", function () {
  let accounts: Signer[];
  let nftContract: Contract;
  let currencyContract: Contract;
  let ballotContract: Contract;
  let ownerAddress: String;
  let b64Pizza = Buffer.from(JSON.stringify(pizzaObj)).toString('base64')
  let baseURI = "https://pizzatoken.pizza/"

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    ownerAddress = await accounts[0].getAddress();
    const PizzaContract: ContractFactory = await ethers.getContractFactory(
      "PizzaToken"
    );



    nftContract = await PizzaContract.deploy();
    await nftContract.deployed();
    let currencyAddr = await nftContract.getTokenAddress();
    currencyContract = await ethers.getContractAt("PizzaCoin", currencyAddr);
  });

  it("Should be able to mint new tokens", async function () {
    await nftContract.safeMint(accounts[1].getAddress(), b64Pizza);
    expect(await nftContract.balanceOf(accounts[1].getAddress())).to.be.equal(1);
  });

  it("Should mint coins when nft is minted", async function () {
    await nftContract.safeMint(accounts[1].getAddress(), b64Pizza);
    expect(await currencyContract.balanceOf(accounts[1].getAddress())).to.be.equal(1);
  });

  it("Should be able to burn tokens after approval is given", async function () {
    await nftContract.safeMint(accounts[1].getAddress(), b64Pizza);
    await nftContract.connect(accounts[1]).approve(ownerAddress, 0);
    expect(await nftContract.burn(0)).to.be.ok;
    expect(await nftContract.balanceOf(accounts[1].getAddress())).to.be.equal(0);

  });

  it("Should decode to a valid pizza object", async function () {
    await nftContract.safeMint(accounts[1].getAddress(), b64Pizza);
    let TokenURI: string = await nftContract.tokenURI(0);
    expect(Buffer.from(TokenURI.replace(baseURI, ''), 'base64').toString()).to.be.equal(JSON.stringify(pizzaObj));
  });

  it("Should return the owner of a token", async function () {
    await nftContract.safeMint(accounts[1].getAddress(), b64Pizza);
    let owner = await nftContract.ownerOf(0);
    expect(owner).to.be.equal(await accounts[1].getAddress());
  });

  it("Should not return a burned token", async function () {
    await nftContract.safeMint(accounts[1].getAddress(), b64Pizza);
    await nftContract.connect(accounts[1]).approve(ownerAddress, 0);
    await nftContract.burn(0);
    expect(nftContract.ownerOf(0)).to.be.revertedWith("ERC721: owner query for nonexistent token");
  });

  it("Should not allow transfer from unnaproved sender", async function () {
    await nftContract.safeMint(accounts[1].getAddress(), b64Pizza);
    expect(nftContract.connect(accounts[2]).transferFrom(accounts[1].getAddress(), accounts[0].getAddress(), 0)).to.be.revertedWith('ERC721: transfer caller is not owner nor approved')
  });

});
