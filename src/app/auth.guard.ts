import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authS: AuthService, private naveCon: NavController) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authS.authUser.pipe(
      take(1),
      map(user => !!user),
      tap(isLogin => {
        if (!isLogin) {
          this.naveCon.navigateRoot('/');
        }
      }),
    );
  }
}
