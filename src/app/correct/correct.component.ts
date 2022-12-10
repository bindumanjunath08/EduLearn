import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignments } from '../models/Assignments';
import { AuthService } from '../models/auth.service';

import { submitted_by } from '../models/submittedby';
import { User } from '../models/user';
import { assignmnetsService } from '../services/assignments.service';
import { submittedbyService } from '../services/submittedby.service';
@Component({
  selector: 'app-correct',
  templateUrl: './correct.component.html',
  styleUrls: ['./correct.component.css']
})
export class CorrectComponent implements OnInit {
  id: any;
  thisuser: User = new User();

  thisass: submitted_by = new submitted_by();
  cl: any;
  constructor(private _authservice: AuthService, private _route: ActivatedRoute,
    private _http: HttpClient, private _router: Router, private _assignmnets: assignmnetsService, private _submittedby: submittedbyService) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this._http.get<submitted_by>(`http://localhost:3000/submitted_by/${this.id}`).subscribe(result => {
      this.thisass = result;
      this._http.get<User>(`http://localhost:3000/users/${this.thisass.student_id}`).subscribe(result => {
        this.thisuser = result;
        console.log(result)
      }, error => {
        console.log(error);
      })
    }, error => {
      console.log(error);
    })



  }
  // notesdownloaded() {
  //   this.thisass.teacher_viewed = "Viewed"
  //   this._http.put(`http://localhost:3000/submitted_by/${this.id}`, this.thisass).subscribe(result => { })
  // }
  updatemarks() {
    this.thisass.teacher_viewed = "Viewed"
    this._http.put(`http://localhost:3000/submitted_by/${this.id}`, this.thisass).subscribe(result => {
      alert('Assignment Corrected.');
      this._router.navigate(['/rewardassignment/' + this.thisass.assignmentid]);
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
