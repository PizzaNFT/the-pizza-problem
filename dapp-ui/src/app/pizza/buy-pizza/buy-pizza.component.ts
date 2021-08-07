import { Component, OnInit } from '@angular/core';
import { PizzaTokenService } from 'src/app/services/pizzaToken.service';
import { GlobalService } from 'src/app/services/global.service';
import { WalletService } from 'src/app/services/wallet.service';
import { ethers } from 'ethers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-pizza',
  templateUrl: './buy-pizza.component.html',
  styleUrls: ['./buy-pizza.component.scss']
})
export class BuyPizzaComponent implements OnInit {

  dough: string = ""
  topping: string = ""
  extra: string = ""
  loading = false;
  constructor(private pizzaTokenService: PizzaTokenService, private router: Router) { }

  ngOnInit(): void {
  }

  async buyPizza() {
    this.loading = true
    await this.pizzaTokenService.buyPizza(this.dough, this.topping, this.extra)
    this.router.navigate(["/pizza/list"])

  }

}
