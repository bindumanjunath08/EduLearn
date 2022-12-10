import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../models/auth.service';
import { Customer } from '../models/customer';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-get-username',
  templateUrl: './get-username.component.html',
  styleUrls: ['./get-username.component.css']
})
export class GetUsernameComponent implements OnInit {
  id: any;
  userList: Array<User> = [];

  customer: User = new User();
  constructor( private _authservice: AuthService,private _route: ActivatedRoute,
    private _http: HttpClient, private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this._userService.getAllUsers().subscribe(result => {
      this.userList = result;
      console.log(result)
    })
    
  
}

  deleteEmp() {
    this._http.delete(`http://localhost:3000/customers/${this.id}`).subscribe(result => {
      alert('Customer details deleted');
      this._router.navigate(['/login']);
    }, error => {
      console.log(error);
    })
  }
  CheckLoginStatus() {
    // if (this._authservice.isLoggedIn())
    //   return false;
    return localStorage.getItem('isLoggedIn') == 'true';

  }
  
  logout() {
    this._authservice.logout();
    localStorage.setItem('isLoggedIn', 'false');
    this._router.navigate(['/login']);
  }

  namethis() {
    console.log("I am here")
    for (const user of this.userList)
    { 
      console.log(user)
      if(user.username==this.id){
      console.log(user)
      this._http.get<User>(`http://localhost:3000/Users/${user.id}`).subscribe(result => {
        this.customer = result;
        this._router.navigate(['/forgot-password/',this.customer.id]);
      }, error => {
        console.log(error);
      })
    }
      else {
        this._router.navigate(['/forgot-password/',this.customer.id]);
      }
    }
  }
}

