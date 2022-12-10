import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignments } from '../models/Assignments';
import { AuthService } from '../models/auth.service';
import { Classes } from '../models/classes';
import { Notes } from '../models/notes';
import { User } from '../models/user';
import { NotesUploadService } from '../notes-upload.service';
import { assignmnetsService } from '../services/assignments.service';
import { notesService } from '../services/notes.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-viewfeedbacks',
  templateUrl: './viewfeedbacks.component.html',
  styleUrls: ['./viewfeedbacks.component.css']
})
export class ViewfeedbacksComponent implements OnInit {
  thisclasses: Classes = new Classes();
  id: any;
  ass1: Assignments[] = [];
  notes1: Notes[] = [];
  upnotes: Notes = new Notes();
  cl: any;
  userList: User[] = [];
  loggeduser: User = new User();
  downby: string[] = [];
  constructor(private _authservice: AuthService, private _route: ActivatedRoute,
    private _http: HttpClient, private _router: Router, private _userService: UserService, private _assignmnets: assignmnetsService, private _notes: notesService) { }

  ngOnInit(): void {
    this._userService.getAllUsers().subscribe(result => {
      this.userList = result;
    })
    this._http.get<User>(`http://localhost:3000/users/${localStorage.getItem('loggeduserid')}`).subscribe(result => {
      this.loggeduser = result;
    }, error => {
      console.log(error);
    })
    this.id = this._route.snapshot.paramMap.get('id');
    localStorage.setItem("classin", this.id)
    this._http.get<Classes>(`http://localhost:3000/classes/${this.id}`).subscribe(result => {
      this.thisclasses = result;
      this.cl = this.thisclasses.assignment_list
      for (const k in this.cl) {
        console.log(this.cl[k])
        this._assignmnets.getClassesById(this.cl[k]).subscribe(result => {
          this.ass1.push(result)
        }, error => {
          console.log(error);
        })

      }
      this.cl = this.thisclasses.notes_list
      for (const k in this.cl) {
        this._notes.getClassesById(this.cl[k]).subscribe(result => {
          this.notes1.push(result)
        }, error => {
          console.log(error);
        })

      }
     
    }, error => {
      console.log(error);
    })
  }
  downloaded(num) {
    this._http.get<Notes>(`http://localhost:3000/notes/${num}`).subscribe(result => {
      this.upnotes = result
      this.upnotes.downloaded_by.push(this.loggeduser.id);
      this._http.put(`http://localhost:3000/notes/${this.upnotes.id}`, this.upnotes).subscribe(result => { })

    })
  }
  CheckIsAdmin() {
    if (this.loggeduser.role=="Teacher")
      return true;
    return false;

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
