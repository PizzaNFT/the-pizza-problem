import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/services/wallet.service';
import { ethers } from "ethers";

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  mneumonic: any = ""
  password: string = ""
  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
  }

  async createAccount() {
    const wallet = this.walletService.createWallet(this.mneumonic)
    await this.walletService.storeWallet(wallet, this.password)
    alert("Carteira Criada")
  }

  async generateMnemonic() {
    this.mneumonic = ethers.Wallet.createRandom().mnemonic.phrase;
  }
}
