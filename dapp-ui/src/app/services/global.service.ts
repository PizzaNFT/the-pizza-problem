import { Injectable } from '@angular/core';
import { ethers } from "ethers";
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  provider: ethers.providers.Provider
  signer: Subject<ethers.Signer>

  constructor() {
    this.provider = ethers.getDefaultProvider("ropsten", {})
    this.signer = new ReplaySubject<ethers.Signer>()
  }

  signin(wallet: ethers.Wallet) {
    this.signer.next(new ethers.Wallet(wallet.privateKey, this.provider))
  }

  getSigner() {
    return this.signer
  }
}
