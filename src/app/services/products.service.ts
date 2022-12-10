import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productlist: any;
  constructor(private _http: HttpClient, private _router: Router) { }


  // getproducts(): Observable<Product[]> {
  //   return this._http.get<Product[]>('http://localhost:3000/products');
  // }
  // getcartitems(): Observable<Product[]> {
  //   return this._http.get<Product[]>('http://localhost:3000/cart');
  // }

  // getproductById(id: number): Observable<Product> {
  //   return this._http.get<Product>(`http://localhost:3000/products/${id}`);
  // }

}