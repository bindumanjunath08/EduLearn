import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Classes } from '../models/classes';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class classesService {
    classeslist: any;
    constructor(private _http: HttpClient, private _router: Router) { }


    getclasses(): Observable<Classes[]> {
        return this._http.get<Classes[]>('http://localhost:3000/classes');
    }

    getClassesById(id: number): Observable<Classes> {
          console.log(this._http.get<Classes>(`http://localhost:3000/classes/1`))
        return this._http.get<Classes>(`http://localhost:3000/classes/${id}`);
    }

}