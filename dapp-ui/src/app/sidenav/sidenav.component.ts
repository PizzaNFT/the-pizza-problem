import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from '../services/global.service';
import { PizzaTokenService } from '../services/pizzaToken.service';
import { PizzaCoinService } from '../services/pizzaCoin.service';
import { ethers } from 'ethers'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  loggedIn: boolean = false
  ethBalance: string | number = "0"
  tokenBalance: string | number
  coinBalance: string | number
  address: string

  constructor(private breakpointObserver: BreakpointObserver, private globalService: GlobalService, private pizzaTokenService: PizzaTokenService, private pizzaCoinService: PizzaCoinService) { }

  async ngOnInit() {
    this.globalService.signer.subscribe(async signer => {
      if (signer) {
        this.loggedIn = true
        this.address = await signer.getAddress()
        const balance = await signer.getBalance()
        this.ethBalance = ethers.utils.formatEther(balance).substring(0, 8)
      }
    })

    this.pizzaTokenService.balance.subscribe(balance => {
      this.tokenBalance = balance
    })
    this.pizzaCoinService.balance.subscribe(balance => {
      this.coinBalance = balance
    })
  }

}
