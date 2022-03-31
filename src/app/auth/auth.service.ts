import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localld: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userAuth = new BehaviorSubject<User | null>(null);
  logoutTimer!: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDd0kaLwXnQnmEqnx4k9gq195DaybXOb0g', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.errorHandler),tap(resData => {
      this.authenticationHandle(resData.email, resData.localld ,resData.idToken, +resData.expiresIn);
    }));
  }

  

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDd0kaLwXnQnmEqnx4k9gq195DaybXOb0g', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap((resData:any) => {
      this.authenticationHandle(resData.email, resData.localld ,resData.idToken, +resData.expiresIn);
    }), catchError(this.errorHandler));
  }

  logout() {
    this.userAuth.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.logoutTimer) {
      clearTimeout(this.logoutTimer)
    }
    this.logoutTimer = null;
  }


  
  private authenticationHandle(email: string,  localId: string,  idToken: string,  expiresIn: number) {
    const expiresDate = new Date( Date.now() + expiresIn * 1000); 
    const user = new User(email,  localId, idToken, expiresDate);
    this.userAuth.next(user);
    localStorage.setItem("userData", JSON.stringify(user));
    this.autoLogOut(expiresIn * 1000);
  }


  private errorHandler(errorResponse: HttpErrorResponse) {
    
      let errorMessage = 'unknown error occured !!!';
      
      if(!errorResponse.error || !errorResponse.error.error) {
        return throwError(() => new Error(errorMessage))
      }

      switch(errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This Email Already Exist !';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Incorrect Password !';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This Account Not Exist !';
          break;
      }
      return throwError(() => new Error(errorMessage))
    
  }



  autoLogin() {
    const userData: {email: string,  localId: string,  _idToken: string,  _expiresIn: Date} = JSON.parse(localStorage?.getItem('userData')!);
    if(!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.localId, userData._idToken, new Date(userData._expiresIn));

    if(loadedUser.token) {
      this.userAuth.next(loadedUser);
      const expiresDuration = new Date(userData._expiresIn).getTime() - new Date().getTime();
      this.autoLogOut(expiresDuration)
    }

  }

  autoLogOut(expiresDuration: number) {

    this.logoutTimer = setTimeout(() => {
      this.logout();
    },expiresDuration)
  } 
}
