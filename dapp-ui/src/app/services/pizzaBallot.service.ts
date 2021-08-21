import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import PizzaBallot from 'src/assets/PizzaBallot.json'
import { GlobalService } from './global.service';
import { PizzaCoinService } from './pizzaCoin.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaBallotService {
  provider: ethers.providers.Provider
  ballotAddress: string
  contract: ethers.Contract

  constructor(private globalService: GlobalService, private pizzaCoinService: PizzaCoinService) {
    this.provider = ethers.getDefaultProvider("ropsten", {})
    this.ballotAddress = "0xCc4aA474c609c293EA00Bc1EdE072fc3Efd69f06"
    this.contract = new ethers.Contract(this.ballotAddress, PizzaBallot.abi, this.provider)
    // this.contract.on("Transfer", (to, amount, from) => {
    //   console.log(to, amount, from);
    // })
  }

  async listProposals() {
    console.log("Before")
    const signer = await this.globalService.getSigner().value as ethers.Signer
    console.log("Signer:", signer)

    const contract = await this.contract.connect(signer)
    try {
      const proposals = await Promise.all([
        contract.proposals(0),
        contract.proposals(1),
        contract.proposals(2),
      ])
      console.log('proposals: ', proposals)
      return proposals.map(prop => {
        return ethers.utils.parseBytes32String(prop.name)
      })
    } catch (err) {
      console.log("Error: ", err)
      return []
    }
  }

  async vote(index: number) {
    const signer = await this.globalService.getSigner().value as ethers.Signer
    const contract = await this.contract.connect(signer)
    try {
      await this.pizzaCoinService.approve(this.ballotAddress, ethers.constants.MaxUint256)
      const data = await contract.vote(index)
      console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  async getVotingResults() {
    const signer = await this.globalService.getSigner().value as ethers.Signer
    const contract = await this.contract.connect(signer)
    try {
      const data = await contract.proposals()
      console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

}
