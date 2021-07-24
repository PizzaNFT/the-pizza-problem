import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import PizzaToken from 'src/assets/pizzaToken.json'

@Injectable({
  providedIn: 'root'
})
export class PizzaTokenService {
  provider: ethers.providers.Provider
  erc721Address: string

  constructor() {
    this.provider = ethers.getDefaultProvider("ropsten", {})
    this.erc721Address = "0x0012451094E9C170E5151e0a793D716ba3915e60"
  }

  async buyPizza(dough: string, topping: string, extra: string, signer: ethers.Signer) {
    let contract = new ethers.Contract(this.erc721Address, PizzaToken.abi, this.provider)

    contract = await contract.connect(signer)
    try {
      const pizza = { dough, topping, extra }
      const base64Pizza = btoa(JSON.stringify(pizza))
      const data = await contract.safeMint(await signer.getAddress(), base64Pizza)
      console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

}
