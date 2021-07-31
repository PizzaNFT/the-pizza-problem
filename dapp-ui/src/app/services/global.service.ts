import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  provider: ethers.providers.Provider
  signer: BehaviorSubject<ethers.Signer | null>

  constructor() {
    this.provider = ethers.getDefaultProvider("ropsten", {})
    this.signer = new BehaviorSubject<ethers.Signer | null>(null)
  }

  signin(wallet: ethers.Wallet) {
    this.signer.next(new ethers.Wallet(wallet.privateKey, this.provider))
  }

  getSigner() {
    return this.signer
  }
}
