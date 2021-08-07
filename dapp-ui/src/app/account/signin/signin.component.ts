import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { PizzaCoinService } from 'src/app/services/pizzaCoin.service';
import { PizzaTokenService } from 'src/app/services/pizzaToken.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  password: string = ""
  constructor(private walletService: WalletService, private globalService: GlobalService, private pizzaTokenService: PizzaTokenService, private pizzaCoinService: PizzaCoinService) { }

  ngOnInit(): void { }

  async signin() {
    try {
      const wallet = await this.walletService.getDecryptedWallet(this.password)
      console.log("Signed in:", wallet)
      await this.globalService.signin(wallet)
      await this.pizzaTokenService.updateBalance()
      await this.pizzaCoinService.updateBalance()
    } catch (err) {
      alert("Invalid password")
    }
  }
}
