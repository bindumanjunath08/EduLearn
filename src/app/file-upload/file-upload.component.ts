import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FilestackModule } from '@filestack/angular';
import * as request from 'request';
import { FileUploadService } from './file-upload.service';

import { Observable } from 'rxjs';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { AuthService } from '../models/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit {
  apikey!: string;
  // Variable to store shortLink from api response
  shortLink: string = "https://www.filestackapi.com/api/store/S3?key=AyYyetEbnSBOD5zESgaUSz";

  // Variable to store shortLink from api response
  loading: boolean = false; // Flag variable
  file?: File; // Variable to store file

  // Inject service 
  constructor( private _router: Router,private _authservice: AuthService,private fileUploadService: FileUploadService, private _http: HttpClient) { }

  ngOnInit(): void {
  }

  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.upload(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {
          console.log(event)
          // Short link via api response
          this.shortLink = event.link;

          this.loading = false; // Flag variable 
        }
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
    return this._http.post("https://www.filestackapi.com/api/store/S3?key=AyYyetEbnSBOD5zESgaUSz", file)
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