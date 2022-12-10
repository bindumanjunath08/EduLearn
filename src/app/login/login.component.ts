import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../models/auth.service';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggeduser: User = new User();

  user: User = new User();
  userList: Array<User> = [];

  constructor( private _authservice: AuthService,private _router: Router, private _userService: UserService) { }

  ngOnInit(): void { }

  login() {
    this._userService.getAllUsers().subscribe(result => {
      this.userList = result;
      if (this.checkLogin()) {
        alert("login succesfull");
        localStorage.setItem('isLoggedIn', 'true');
        this._router.navigate(['/home'])
      } else {
        alert('Invalid Credentials');
        this.clearFields();
      }

    }, error => {
      console.log(error);
    })
  }

  checkLogin() {
    for (const user of this.userList) {
      if (user.username == this.user.username && user.password == this.user.password) {
        this.loggeduser = user
        localStorage.setItem("loggeduserid", this.loggeduser.id.toString());
        if (user.role == "Teacher") {
          localStorage.setItem('isAdmin', 'true');

        }
        return true;
      }

    }
    return false;
  }

  clearFields() {
    this.user = new User();
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
