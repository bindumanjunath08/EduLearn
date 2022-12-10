import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../models/auth.service';
import { Product } from '../models/product';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public searchInput: String = '';
  public searchResult: Array<any> = [];
  public seriesList: Array<any> = [];
  productlist: Product[] = [];
  searchlist: Product[] = [];
  name: string = "";
  constructor(private _authservice: AuthService, private _router: Router, private http: HttpClient, private _product: ProductsService) {

  }

  ngOnInit(): void {
    this.CheckLoginStatus();
    // this._product.getproducts().subscribe(result => {
    //   this.productlist = result;
    // }, error => {
    //   console.log(error);
    // })

  }


  CheckLoginStatus() {
    // if (this._authservice.isLoggedIn())
    //   return false;
    console.log(localStorage.getItem('isLoggedIn'))
    return localStorage.getItem('isLoggedIn') == 'true';

  }
  CheckIsAdmin() {
    if (this._authservice.isAdmin())
      return true;
    return false;

  }
  logout() {
    this._authservice.logout();
    localStorage.setItem('isLoggedIn', 'false');
    this._router.navigate(['/login']);
  }

  fetchSeries(value: String) {
    if (value === '') {
      return this.searchResult = []
    }
    this.searchResult = this.productlist.filter(function (series) {
      return series.name.toLowerCase().startsWith(value.toLowerCase())
    })
    return "";
  }

}



