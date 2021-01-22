import { Injectable } from '@angular/core';
import { AuthService } from '../../services';
import {
  Router,
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Roles } from 'src/app/models';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private _router: Router,
    private _authenticationService: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }

  async canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    if (
      [Roles.Root, Roles.User, Roles.Administrator].indexOf(
        this._authenticationService.currentUserValue.result.UserTypeName
      ) != -1
    )
      return true;

    // not logged in so redirect to login page with the return url
    this._router.navigate(['/']);
    return false;
  }
}
