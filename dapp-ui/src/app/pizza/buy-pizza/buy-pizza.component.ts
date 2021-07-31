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

  constructor(private globalService: GlobalService, private pizzaTokenService: PizzaTokenService, private walletService: WalletService) { }

  ngOnInit(): void {
  }

  async buyPizza() {
    this.pizzaTokenService.buyPizza(this.dough, this.topping, this.extra)
  }

}
