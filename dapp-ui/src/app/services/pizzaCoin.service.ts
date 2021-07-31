import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import PizzaToken from 'src/assets/pizzaToken.json'
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaCoinService {
  provider: ethers.providers.Provider
  erc721Address: string
  contract: ethers.Contract

  constructor(private globalService: GlobalService) {
    this.provider = ethers.getDefaultProvider("ropsten", {})
    this.erc721Address = "0x64ec11DdC3df305d7C00FE14B11F49C91c0A999c"
    this.contract = new ethers.Contract(this.erc721Address, PizzaToken.abi, this.provider)
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

}
