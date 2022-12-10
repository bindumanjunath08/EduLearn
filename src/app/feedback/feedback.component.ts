import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classes } from '../models/classes';
import { User } from '../models/user';
import { AuthService } from '../models/auth.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
feedback:string ='';
  id: any;
  class: Classes = new Classes();
  constructor( private _authservice: AuthService,private _route: ActivatedRoute,
    private _http: HttpClient,
    private _router: Router) { }


    ngOnInit(): void {
      this.id = this._route.snapshot.paramMap.get('id');
      this._http.get<Classes>(`http://localhost:3000/classes/${this.id}`).subscribe(result => {
        this.class = result;
      }, error => {
        console.log(error);
      })
    }
    addfeedback() {
      this.class.feedback.push(this.feedback);
      this._http.put(`http://localhost:3000/classes/${this.id}`, this.class).subscribe(result => {
        alert('Feedback Updated Successfully.');
        this._router.navigate(['/home']);
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
