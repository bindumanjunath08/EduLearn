import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Assignments } from '../models/Assignments';
import { Classes } from '../models/classes';
import { User } from '../models/user';
import { AuthService } from '../models/auth.service';

@Component({
  selector: 'app-createassignmnet',
  templateUrl: './createassignmnet.component.html',
  styleUrls: ['./createassignmnet.component.css']
})
export class CreateassignmnetComponent implements OnInit {
  shortLink: string = "https://www.filestackapi.com/api/store/S3?key=Amggjl8WScCHZJDnlg7Xxz";

  // Variable to store shortLink from api response
  loading: boolean = false; // Flag variable
  file?: File; // Variable to store file



  product: Assignments = new Assignments();
  loggeduser: User = new User();
  classin: Classes = new Classes();
  abc: number[] = [];
  filename: String="";
  constructor( private _authservice: AuthService,private _http: HttpClient, private _router: Router) { }
  ngOnInit(): void {
    this._http.get<User>(`http://localhost:3000/users/${localStorage.getItem('loggeduserid')}`).subscribe(result => {
      this.loggeduser = result;
    }, error => {
      console.log(error);
    })
    this._http.get<Classes>(`http://localhost:3000/Classes/${localStorage.getItem('classin')}`).subscribe(result => {
      this.classin = result;
    }, error => {
      console.log(error);
    })
  }

  addproduct() {
    this.onUpload()
    

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
        this.product.input_file=String(event.url)
        
    this.product.class_id = this.classin.id
    this.product.submitted_by = this.abc
    console.log(this.filename)
    this._http.post<any>('http://localhost:3000/assignments', this.product).subscribe(data => {
      alert('assignment added successfully');
      this.classin.assignment_list.push(data.id);

    //   this._http.put(`http://localhost:3000/assignments/${data.id}`, this.product).subscribe(result => {
    // },error=> {
    //   console.log(error);
    // })
      console.log("done")
      this._http.put(`http://localhost:3000/classes/${this.classin.id}`, this.classin).subscribe(result => {
        this._router.navigate(['/home']);
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