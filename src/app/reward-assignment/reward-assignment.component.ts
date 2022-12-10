import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignments } from '../models/Assignments';
import { AuthService } from '../models/auth.service';
import { Classes } from '../models/classes';
import { Notes } from '../models/notes';
import { submitted_by } from '../models/submittedby';
import { NotesUploadService } from '../notes-upload.service';
import { assignmnetsService } from '../services/assignments.service';
import { notesService } from '../services/notes.service';
import { submittedbyService } from '../services/submittedby.service';

@Component({
  selector: 'app-reward-assignment',
  templateUrl: './reward-assignment.component.html',
  styleUrls: ['./reward-assignment.component.css']
})
export class RewardAssignmentComponent implements OnInit {
  id: any;
  thisass: Assignments = new Assignments();
  submittedby: submitted_by[] = [];
  cl: any;
  constructor(private _authservice: AuthService, private _route: ActivatedRoute,
    private _http: HttpClient, private _router: Router, private _assignmnets: assignmnetsService, private _submittedby: submittedbyService) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this._http.get<Assignments>(`http://localhost:3000/assignments/${this.id}`).subscribe(result => {
      this.thisass = result;
      console.log(result)
      this.cl = this.thisass.submitted_by
      for (const k in this.cl) {
        console.log(this.cl[k])
        this._submittedby.getClassesById(this.cl[k]).subscribe(result => {
          this.submittedby.push(result)
        }, error => {
          console.log(error);
        })

      }

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


