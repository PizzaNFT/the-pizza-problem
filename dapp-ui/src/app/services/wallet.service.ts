import { Injectable } from '@angular/core';
import { ethers } from "ethers";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor() { }

  createWallet(mneumonic: string): ethers.Wallet {
    const wallet = ethers.Wallet.fromMnemonic(mneumonic)
    return wallet
  }

  async storeWallet(wallet: ethers.Wallet, password: string) {
    const encryptedWallet = await wallet.encrypt(password, {
      scrypt: {
        N: 1 << 12
      }
    })
    console.log("Wallet:", wallet)
    console.log("Encrypted:", encryptedWallet)
    window.localStorage.setItem("wallet", encryptedWallet)
  }

  async getDecryptedWallet(password: string): Promise<ethers.Wallet> {
    const encryptedWallet = window.localStorage.getItem("wallet") ?? ""
    return ethers.Wallet.fromEncryptedJsonSync(encryptedWallet, password)
  }

}
