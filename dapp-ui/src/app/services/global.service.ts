import { Injectable } from '@angular/core';
import { ethers } from "ethers";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  provider: ethers.providers.Provider
  wallet: ethers.Wallet
  signer: ethers.Signer

  constructor() {
    this.provider = ethers.getDefaultProvider("ropsten", {})
  }

  signin(wallet: ethers.Wallet) {
    this.wallet = wallet
    this.signer = new ethers.Wallet(this.wallet.privateKey, this.provider)
  }

  getWallet(): ethers.Wallet {
    return this.wallet
  }

  getSigner(wallet: ethers.Wallet) {
    this.signer = new ethers.Wallet(wallet.privateKey, this.provider)
    return this.signer
  }

}
