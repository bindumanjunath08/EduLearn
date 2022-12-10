import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Classes } from '../models/classes';
import { User } from '../models/user';
import { AuthService } from '../models/auth.service';

@Component({
  selector: 'app-createclass',
  templateUrl: './createclass.component.html',
  styleUrls: ['./createclass.component.css']
})
export class CreateclassComponent implements OnInit {
  product: Classes = new Classes();
  loggeduser: User = new User();
  abc: number[] = [];

  constructor( private _authservice: AuthService,private _http: HttpClient, private _router: Router) { }
  ngOnInit(): void {
    this._http.get<User>(`http://localhost:3000/users/${localStorage.getItem('loggeduserid')}`).subscribe(result => {
      this.loggeduser = result;
    }, error => {
      console.log(error);
    })
  }

  addproduct() {

    console.log(this.product);
    this.product.faculty_name = this.loggeduser.name
    this.product.students = this.abc
    this.product.assignment_list = this.abc
    this.product.notes_list = this.abc
    this.product.feedback=[]
    this._http.post<any>('http://localhost:3000/classes', this.product).subscribe(data => {
      alert('Class added successfully');
      this.loggeduser.classes_joined.push(data.id);
      this._http.put(`http://localhost:3000/users/${this.loggeduser.id}`, this.loggeduser).subscribe(result => {

      }, error => {
        console.log(error);
      })
    }, error => {
      console.log(error);
    })

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