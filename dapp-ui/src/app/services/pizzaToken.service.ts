import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import PizzaToken from 'src/assets/pizzaToken.json'
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaTokenService {
  provider: ethers.providers.Provider
  erc721Address: string
  contract: ethers.Contract

  constructor(private globalService: GlobalService) {
    this.provider = ethers.getDefaultProvider("ropsten", {})
    this.erc721Address = "0x0012451094E9C170E5151e0a793D716ba3915e60"
    this.contract = new ethers.Contract(this.erc721Address, PizzaToken.abi, this.provider)
  }

  async buyPizza(dough: string, topping: string, extra: string) {
    const signer = await this.globalService.getSigner().toPromise() as ethers.Signer

    this.contract = await this.contract.connect(signer)
    try {
      const pizza = { dough, topping, extra }
      const base64Pizza = btoa(JSON.stringify(pizza))
      const data = await this.contract.safeMint(await signer.getAddress(), base64Pizza)
      console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

}
