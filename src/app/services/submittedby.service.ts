import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Classes } from '../models/classes';
import { Observable } from 'rxjs';
import { Notes } from '../models/notes';
import { submitted_by } from '../models/submittedby';


@Injectable({
    providedIn: 'root'
})
export class submittedbyService {
    classeslist: any;
    constructor(private _http: HttpClient, private _router: Router) { }


    getclasses(): Observable<submitted_by[]> {
        return this._http.get<submitted_by[]>('http://localhost:3000/submitted_by');
    }

    getClassesById(id: number): Observable<submitted_by> {
        return this._http.get<submitted_by>(`http://localhost:3000/submitted_by/${id}`);
    }

}