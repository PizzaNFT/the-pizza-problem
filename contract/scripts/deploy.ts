import * as dotenv from "dotenv";
import { ethers } from "ethers";

import * as PizzaBallot from "../artifacts/contracts/PizzaBallot.sol/PizzaBallot.json";
import * as PizzaTokenJson from "../artifacts/contracts/PizzaToken.sol/PizzaToken.json";
import * as PizzaCoinJson from "../artifacts/contracts/PizzaCoin.sol/PizzaCoin.json";

dotenv.config();

const PROPOSALS = ["Cheeseeeeee", "Bacon", "4 Bacon"];

async function main() {

  const pkey = process.env.ADMIN_PRIVATE_KEY ?? "";
  if (pkey.length < 64) throw new Error("Private Key not set up");
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.PROVIDER_URL
  );

  const signer = new ethers.Wallet(pkey, provider);

  const pizzaCoinAddress = await deployToken(signer)

  await deployBallot(signer, pizzaCoinAddress)

}

const deployToken = async (signer: ethers.Signer) => {
  console.log("[PizzaToken] Deploying...")
  const contractFactory = new ethers.ContractFactory(
    PizzaTokenJson.abi,
    PizzaTokenJson.bytecode,
    signer
  );
  const pizzaToken = await contractFactory.deploy();
  console.log("[PizzaToken] Awaiting confirmations");

  const tx = await pizzaToken.deployed();
  await tx.deployTransaction.wait()
  console.log("[PizzaToken] Contract deployed at: " + pizzaToken.address);
  console.log("[PizzaToken] Deployed")

  const pizzaCoinAddress = await pizzaToken.pizzaCoinAddr()
  console.log("[PizzaToken] PizzaCoin addr: " + pizzaCoinAddress);

  const minters = [
    { role: "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6", address: "0x2303F6e666cEa0b2bdFc41976e91D7526C6cBe0b" }
  ]

  console.log("[PizzaToken] Grating roles...")
  const grantRoleTx = await pizzaToken.grantRole(minters[0].role, minters[0].address)
  await grantRoleTx.wait()


  // Testing
  // minters.forEach(async minter => {
  //   const data = await pizzaToken.hasRole(minter.role, minter.address)
  //   console.log("Has Role:", data)
  // })

  return pizzaCoinAddress
}

const deployBallot = async (signer: ethers.Signer, pizzaCoinAddress: string) => {
  console.log("[PizzaBallot] Deploying...")
  const contractFactory = new ethers.ContractFactory(
    PizzaBallot.abi,
    PizzaBallot.bytecode,
    signer
  );

  let proposalsArray: string[] = [];
  PROPOSALS.forEach((element) => {
    proposalsArray.push(ethers.utils.formatBytes32String(element));
  });
  const votingDuration = 3; // days
  const ballotContract = await contractFactory.deploy(proposalsArray, pizzaCoinAddress, votingDuration);
  console.log("[PizzaBallot] Awaiting confirmations");

  await ballotContract.deployed();
  console.log("[PizzaBallot] Contract deployed at: " + ballotContract.address);
  console.log("[PizzaBallot] Deployed")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
