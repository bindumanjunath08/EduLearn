import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Classes } from '../models/classes';
import { Observable } from 'rxjs';
import { Notes } from '../models/notes';


@Injectable({
    providedIn: 'root'
})
export class notesService {
    classeslist: any;
    constructor(private _http: HttpClient, private _router: Router) { }


    getclasses(): Observable<Notes[]> {
        return this._http.get<Notes[]>('http://localhost:3000/Notes');
    }

    getClassesById(id: number): Observable<Notes> {
        return this._http.get<Notes>(`http://localhost:3000/Notes/${id}`);
    }

}