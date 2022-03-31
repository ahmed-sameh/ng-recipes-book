import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class AuthGurd implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
    return this.authService.userAuth.pipe(take(1), map(userAuthData => {
      const isAuthenticated = !!userAuthData;

      if(isAuthenticated) {
        return true
      }else {
        return this.router.createUrlTree(['/auth'])
      }
    }))
  }
}