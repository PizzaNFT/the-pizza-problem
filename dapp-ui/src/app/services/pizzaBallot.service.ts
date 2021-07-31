import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import PizzaToken from 'src/assets/pizzaToken.json'
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaBallotService {
  provider: ethers.providers.Provider
  erc721Address: string

  constructor(private globalService: GlobalService) {
    this.provider = ethers.getDefaultProvider("ropsten", {})
    this.erc721Address = "0x62f997457064bdB83AbD2cFC7f01202A60F12E38"
  }

  async listProposals() {
    console.log("Before")
    const signer = await this.globalService.getSigner().toPromise() as ethers.Signer
    console.log("Signer:", signer)
    let contract = new ethers.Contract(this.erc721Address, PizzaToken.abi, this.provider)

    contract = await contract.connect(signer)
    try {
      const data = await contract.proposals()
      console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  async vote(signer: ethers.Signer) {
    let contract = new ethers.Contract(this.erc721Address, PizzaToken.abi, this.provider)

    contract = await contract.connect(signer)
    try {
      const data = await contract.vote(1)
      console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

}
