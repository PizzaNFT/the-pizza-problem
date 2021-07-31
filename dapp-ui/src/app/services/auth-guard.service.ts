import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { GlobalService } from './global.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private globalService: GlobalService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.globalService.signer.pipe(
      take(1),
      map(signer => {
        if (!signer) {
          return false
        }
        return true
      }))
  }

}
