import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../models/customer';
import { User } from '../models/user';
import { AuthService } from '../models/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  password2: any;
  customer: User = new User();
  constructor( private _authservice: AuthService,private _http: HttpClient, private _router: Router) { }

  ngOnInit(): void {

  }
  addcustomer() {
    console.log(this.customer);
    if (this.password2 == this.customer.password) {
      this.customer.classes_joined = []
      this._http.post('http://localhost:3000/Users', this.customer).subscribe(result => {
        alert('Registered Successfully');
        console.log(result); this._router.navigate(['/login'])
      }, error => {
        console.log(error);
      })
    }
    else {
      alert("Passwords didnt match")
    }
  }
  CheckLoginStatus() {
    // if (this._authservice.isLoggedIn())
    //   return false;
    console.log("going in here")
    console.log(localStorage.getItem('isLoggedIn'))
    return localStorage.getItem('isLoggedIn') == 'true';

  }
  
  logout() {
    this._authservice.logout();
    localStorage.setItem('isLoggedIn', 'false');
    this._router.navigate(['/login']);
  }

}
