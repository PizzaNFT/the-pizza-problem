import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { BehaviorSubject } from 'rxjs';
import { single } from 'rxjs/operators';
import PizzaCoin from 'src/assets/PizzaCoin.json'
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaCoinService {
  provider: ethers.providers.Provider
  erc721Address: string
  contract: ethers.Contract
  balance: BehaviorSubject<string | number>

  constructor(private globalService: GlobalService) {
    this.provider = ethers.getDefaultProvider("ropsten", {})
    this.erc721Address = "0xe48f59eD9985AEA9fEe63f743b3ad7192B295529"
    this.contract = new ethers.Contract(this.erc721Address, PizzaCoin.abi, this.provider)
    this.balance = new BehaviorSubject<string | number>(0)
  }

  async approve(spenderAddress: string, amount: ethers.BigNumber) {
    const signer = await this.globalService.getSigner().value as ethers.Signer

    const contract = await this.contract.connect(signer)
    try {
      const data = await contract.approve(spenderAddress, amount)
      await data.wait()
      console.log('Approve data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  async updateBalance() {
    const signer = await this.globalService.getSigner().value as ethers.Signer

    const contract = await this.contract.connect(signer)
    try {
      const balance = await contract.balanceOf(await signer.getAddress())
      this.balance.next(balance.toNumber())
    } catch (err) {
      console.log("Error: ", err)
    }
  }

}
