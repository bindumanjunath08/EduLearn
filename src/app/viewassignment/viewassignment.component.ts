import { HttpClient } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Assignments } from '../models/Assignments';
import { AuthService } from '../models/auth.service';
import { Classes } from '../models/classes';
import { submitted_by } from '../models/submittedby';
import { User } from '../models/user';
import { assignmnetsService } from '../services/assignments.service';
import { notesService } from '../services/notes.service';
import { submittedbyService } from '../services/submittedby.service';

@Component({
  selector: 'app-viewassignment',
  templateUrl: './viewassignment.component.html',
  styleUrls: ['./viewassignment.component.css']
})
export class ViewassignmentComponent implements OnInit {
  shortLink: string = "https://www.filestackapi.com/api/store/S3?key=Amggjl8WScCHZJDnlg7Xxz";

  // Variable to store shortLink from api response
  loading: boolean = false; // Flag variable
  file?: File; // Variable to store file
  date: Date = new Date("2019-01-16");  
  id: any;
  ass1: Assignments = new Assignments();
  loggeduser: User = new User();
  history: submitted_by = new submitted_by();
  submittedlist: Array<submitted_by> = [];
  cl: any;
  user: submitted_by = new submitted_by();
  productlist: any;
  today = new Date().toLocaleDateString()


  constructor(private _authservice: AuthService, private _route: ActivatedRoute,
    private _http: HttpClient, private _router: Router, private _assignmnets: assignmnetsService, private _userService: submittedbyService) { }

  ngOnInit(): void {
    this._userService.getclasses().subscribe(result => {
      this.productlist = result;
      for (const user of this.productlist) {

        this.submittedlist.push(user)

      }
    })

    this.id = this._route.snapshot.paramMap.get('id');
    localStorage.setItem("classin", this.id)
    this._http.get<Assignments>(`http://localhost:3000/assignments/${this.id}`).subscribe(result => {
      this.ass1 = result;
    })
    this._http.get<User>(`http://localhost:3000/users/${localStorage.getItem('loggeduserid')}`).subscribe(result => {
      this.loggeduser = result;

      for (const user of this.submittedlist) {
        console.log(user)
        if (user.student_id == this.loggeduser.id) {
          console.log('jabjcbvb')

          if (this.id == user.assignmentid) {
            console.log(this.user)
            this._http.get<submitted_by>(`http://localhost:3000/submitted_by/${user.id}`).subscribe(result => {
              this.history = result;

              console.log("done",this.history)
            })
          }
        }
      }
    }, error => {
      console.log(error);
    })

  }

  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    this.upload(this.file).subscribe(
      (event: any) => {
        console.log("shvcgvvsbvc")
        console.log(String(event.url))
        this.history.file_path=String(event.url)
        this.history.marks=0
        this.history.remarks="Yet to be Corrected"
        this.history.teacher_viewed="No"
        this.history.student_id=this.loggeduser.id
        this.history.assignmentid = this.ass1.id
        this.history.submitted_date = String(this.date.getDate()+'/'+ this.date.getMonth()+'/'+this.date.getFullYear());
        this._http.post<any>('http://localhost:3000/submitted_by', this.history).subscribe(data => {
          alert('Assignment Submitted Successfully');
          
          this.ass1.submitted_by.push(this.loggeduser.id);
          console.log("hello man")
          console.log(this.ass1)
          this._http.put(`http://localhost:3000/assignments/${this.ass1.id}`, this.ass1).subscribe(result => {
            this._router.navigate(['/home'])
      
      }, error => {
        console.log(error);
      })
    }, error => {
      console.log(error);
    })
      }
    );

  }
  upload(file): Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("file", file, file.name);

    // Make http post request over api
    // with formData as req
    return this._http.post("https://www.filestackapi.com/api/store/S3?key=Amggjl8WScCHZJDnlg7Xxz", file)
  }
  marks(){
   return this.history.marks!=0
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
