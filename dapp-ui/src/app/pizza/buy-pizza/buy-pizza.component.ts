import { Component, OnInit } from '@angular/core';
import { PizzaTokenService } from 'src/app/services/pizzaToken.service';
import { GlobalService } from 'src/app/services/global.service';
import { WalletService } from 'src/app/services/wallet.service';
import { ethers } from 'ethers';

@Component({
  selector: 'app-buy-pizza',
  templateUrl: './buy-pizza.component.html',
  styleUrls: ['./buy-pizza.component.scss']
})
export class BuyPizzaComponent implements OnInit {

  dough: string = ""
  topping: string = ""
  extra: string = ""
  password: string = ""

  constructor(private globalService: GlobalService, private pizzaTokenService: PizzaTokenService, private walletService: WalletService) { }

  ngOnInit(): void {
  }

  async buyPizza() {
    let wallet: ethers.Wallet;
    try {
      wallet = await this.walletService.getDecryptedWallet(this.password)
    } catch (err) {
      console.log(err)
      alert("Senha inválida.")
      return
    }
    const signer = await this.globalService.getSigner().toPromise()
    console.log(signer)
    this.pizzaTokenService.buyPizza(this.dough, this.topping, this.extra, signer)

  }

}
