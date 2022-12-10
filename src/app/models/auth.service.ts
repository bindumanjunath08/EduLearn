import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate() {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this._router.navigate(['/login'])
      alert("please Login to access");
      return false;
    }
  }
  isLoggedIn(): boolean {
    if (localStorage.getItem('isLoggedIn') == 'true') {
      return true;
    }
    return false;
  }
  isAdmin(): boolean {
    if (localStorage.getItem('isAdmin') == 'true') {
      return true;
    }
    return false;
  }
  logout() {
    this._router.navigate(['/login'])
    localStorage.removeItem('isLoggedIn');
  }

}
