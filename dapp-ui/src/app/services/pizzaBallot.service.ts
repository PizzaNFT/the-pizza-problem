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
  contract: ethers.Contract

  constructor(private globalService: GlobalService) {
    this.provider = ethers.getDefaultProvider("ropsten", {})
    this.erc721Address = "0x62f997457064bdB83AbD2cFC7f01202A60F12E38"
    this.contract = new ethers.Contract(this.erc721Address, PizzaToken.abi, this.provider)
  }

  async listProposals() {
    console.log("Before")
    const signer = await this.globalService.getSigner().toPromise() as ethers.Signer
    console.log("Signer:", signer)

    this.contract = await this.contract.connect(signer)
    try {
      const data = await this.contract.proposals()
      console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  async vote(signer: ethers.Signer) {
    this.contract = await this.contract.connect(signer)
    try {
      const data = await this.contract.vote(1)
      console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

}
