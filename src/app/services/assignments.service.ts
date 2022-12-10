import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Classes } from '../models/classes';
import { Observable } from 'rxjs';
import { Assignments } from '../models/Assignments';


@Injectable({
    providedIn: 'root'
})
export class assignmnetsService {
    classeslist: any;
    constructor(private _http: HttpClient, private _router: Router) { }


    getclasses(): Observable<Assignments[]> {
        return this._http.get<Assignments[]>('http://localhost:3000/assignments');
    }

    getClassesById(id: number): Observable<Assignments> {
        return this._http.get<Assignments>(`http://localhost:3000/assignments/${id}`);
    }

}