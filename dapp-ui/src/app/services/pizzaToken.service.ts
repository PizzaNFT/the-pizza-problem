import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { BehaviorSubject } from 'rxjs';
import PizzaToken from 'src/assets/pizzaToken.json'
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PizzaTokenService {
  provider: ethers.providers.Provider
  erc721Address: string
  contract: ethers.Contract
  balance: BehaviorSubject<string | number>

  constructor(private globalService: GlobalService) {
    this.provider = ethers.getDefaultProvider("ropsten", {})
    this.erc721Address = "0x5a4505F60cd106189FeD5C50c0aD8BeCEf9CDF92"
    this.contract = new ethers.Contract(this.erc721Address, PizzaToken.abi, this.provider)
    this.balance = new BehaviorSubject<string | number>(0)
  }

  async buyPizza(dough: string, topping: string, extra: string) {
    const signer = await this.globalService.getSigner().value as ethers.Signer

    const contract = await this.contract.connect(signer)
    try {
      const pizza = { dough, topping, extra }
      const base64Pizza = btoa(JSON.stringify(pizza))
      const data = await contract.safeMint(await signer.getAddress(), base64Pizza)
      console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
    }
  }

  async listPizzas() {
    const signer = await this.globalService.getSigner().value as ethers.Signer

    const contract = await this.contract.connect(signer)
    try {
      const signerAddress = await signer.getAddress()
      let balance = <ethers.BigNumber>(await contract.balanceOf(signerAddress))
      console.log("Pizzas =", balance.toNumber())

      const pizzas = []
      for (let i = 0; i < balance.toNumber(); i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(signerAddress, i)
        const tokenURI = <string>await contract.tokenURI(tokenId)
        let description = atob(tokenURI.split("https://pizzatoken.pizza/")[1])
        pizzas.push(JSON.parse(description))
      }
      return pizzas;
      // const data = await contract.safeMint(await signer.getAddress())
      // console.log('data: ', data)
    } catch (err) {
      console.log("Error: ", err)
      return []
    }
  }

  async updateBalance(): Promise<number> {
    const signer = await this.globalService.getSigner().value as ethers.Signer

    const contract = await this.contract.connect(signer)
    try {
      const signerAddress = await signer.getAddress()
      let balance = <ethers.BigNumber>(await contract.balanceOf(signerAddress))
      console.log("Pizzas =", balance.toNumber())
      this.balance.next(balance.toNumber())
      return balance.toNumber()
    } catch (err) {
      console.log("Error: ", err)
      return 0
    }
  }

}
