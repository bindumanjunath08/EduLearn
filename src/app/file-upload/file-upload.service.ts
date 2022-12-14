import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class FileUploadService {

    // API url
    baseApiUrl = "https://www.filestackapi.com/api/store/S3?key=Amggjl8WScCHZJDnlg7Xxz"

    constructor(private http: HttpClient) { }

    // Returns an observable
    upload(file): Observable<any> {

        // Create form data
        const formData = new FormData();

        // Store form name as "file" with file data
        formData.append("file", file, file.name);

        // Make http post request over api
        // with formData as req
        return this.http.post(this.baseApiUrl, file)
    }
}
