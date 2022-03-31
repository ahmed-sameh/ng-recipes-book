import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  
  authUserSub!: Subscription;
  isAuthenticated = false;
  constructor(private storageService: DataStorageService, private authService: AuthService){}

  ngOnInit(): void {
    this.authUserSub = this.authService.userAuth.subscribe({
      next: userData => this.isAuthenticated = !!userData
    })
  }
  onFetchData(){
    this.storageService.fetchRecipes().subscribe();
  }

  onSaveData(){
    this.storageService.storeRecipes()
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.authUserSub.unsubscribe()
  }

}
