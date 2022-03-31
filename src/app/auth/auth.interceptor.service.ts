import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      return this.authService.userAuth.pipe(take(1), exhaustMap(userReqData => {
        if(userReqData) {

          const modifiedReq = req.clone({
            params: new HttpParams().set('auth', userReqData!.token!)
          })

          return next.handle(modifiedReq)

        }else {
          return next.handle(req)
        }
      }))
  }
}