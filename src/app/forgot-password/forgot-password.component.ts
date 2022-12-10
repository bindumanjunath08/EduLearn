import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../models/auth.service';
import { Customer } from '../models/customer';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  id: any;
  customer: Customer = new Customer();
  password1:string='';
  password2:string='';
  constructor( private _authservice: AuthService,private _route: ActivatedRoute,
    private _http: HttpClient,
    private _router: Router) { }

  ngOnInit(): void {
    this.id = this._route.snapshot.paramMap.get('id');
    this._http.get<Customer>(`http://localhost:3000/Users/${this.id}`).subscribe(result => {
      this.customer = result;
    }, error => {
      console.log(error);
    })
  }

  updatecustomer(pass1,pass2) {
    console.log(pass1,pass2)
    if(pass1==pass2)
    {
      this.customer.password=pass1
      this._http.put(`http://localhost:3000/Users/${this.id}`, this.customer).subscribe(result => {
      alert('Password Updated Successfully.');
      this._router.navigate(['/login']);
    }, error => {
      console.log(error);
    })}
    else{
      alert("passwords mismatch")
    }
    
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