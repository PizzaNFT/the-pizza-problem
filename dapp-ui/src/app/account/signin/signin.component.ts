import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  password: string = ""
  constructor(private walletService: WalletService, private globalService: GlobalService) { }

  ngOnInit(): void { }

  async signin() {
    try {
      const wallet = await this.walletService.getDecryptedWallet(this.password)
      console.log("Signed in:", wallet)
      await this.globalService.signin(wallet)
    } catch (err) {
      alert("Invalid password")
    }

  }
}
