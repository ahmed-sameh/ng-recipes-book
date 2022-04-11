import { Component, OnInit, Type, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  isLoginMood = false;
  error:string|null = null;


  authObserv!: Observable<AuthResponseData>;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}

  onSwitchMood() {
    this.isLoginMood = !this.isLoginMood
  }

  onSubmit(authForm: NgForm) {
    this.isLoading = true;
    if(authForm.invalid) {
      return
    }

    if(this.isLoginMood){

      this.authObserv = this.authService.login(authForm.value.email, authForm.value.password);

    }else {

      this.authObserv = this.authService.signUp(authForm.value.email, authForm.value.password);

    }

    this.authObserv.subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    })
    
    
    authForm.reset()
  }


  onHandleError() {
    this.error = null;
  }


}
