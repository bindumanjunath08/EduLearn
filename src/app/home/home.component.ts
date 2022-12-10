import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../models/auth.service';
import { Classes } from '../models/classes';
import { User } from '../models/user';
import { classesService } from '../services/classes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  product: Classes = new Classes();
  id: any;
  class_code: any;
  loggeduser: User = new User();
  arr: Classes[] = [];
  arr1: Classes[] = [];

  productlist: any;
  cl: any;
  constructor(private _authservice: AuthService, private _http: HttpClient, private _route: ActivatedRoute, private _router: Router, private _classes: classesService) { }
  ngOnInit(): void {


    this._http.get<User>(`http://localhost:3000/users/${localStorage.getItem('loggeduserid')}`).subscribe(result => {
      this.loggeduser = result;
      this.cl = this.loggeduser.classes_joined

      const distinctArray = this.cl.filter((n, i) => this.cl.indexOf(n) === i);
      for (const k in distinctArray) {
        this._http.get<Classes>(`http://localhost:3000/classes/${this.cl[k]}`).subscribe(result => {
          result.student_count = result.students.length

          this.arr1.push(result)
        }, error => {
        })
      }
    }, error => {
    })
    this._classes.getclasses().subscribe(result => {
      this.productlist = result;
      for (const user of this.productlist) {

        this.arr.push(user)

      }
    }, error => {
    })

  }
  CheckIsAdmin() {
    if (this.loggeduser.role=="Teacher")
      return true;
    return false;

  }
  joinclass() {
    for (const x of this.arr) {
      if (x.class_code == this.class_code) {
        this.loggeduser.classes_joined.push(x.id)
        this._http.put(`http://localhost:3000/users/${this.loggeduser.id}`, this.loggeduser).subscribe(result => {

        })
        x.students.push(this.loggeduser.id)
        x.student_count=x.student_count+1
        this._http.put(`http://localhost:3000/classes/${x.id}`, x).subscribe(result => {

      })
      }
    }
  }



  CheckLoginStatus() {
    // if (this._authservice.isLoggedIn())
    //   return false;
    console.log(localStorage.getItem('isLoggedIn'))
    return localStorage.getItem('isLoggedIn') == 'true';

  }
  
  logout() {
    this._authservice.logout();
    localStorage.setItem('isLoggedIn', 'false');
    this._router.navigate(['/login']);
  }


}

