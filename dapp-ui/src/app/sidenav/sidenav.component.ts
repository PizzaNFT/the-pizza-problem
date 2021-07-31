import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from '../services/global.service';

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
  constructor(private breakpointObserver: BreakpointObserver, private globalService: GlobalService) { }

  ngOnInit() {
    this.globalService.signer.subscribe(signer => {
      if (signer) {
        this.loggedIn = true
      }
      console.log("The signer:", signer)
    })
  }

}
