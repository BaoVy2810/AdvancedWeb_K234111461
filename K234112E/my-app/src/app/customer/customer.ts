import { Component } from '@angular/core';
import { Customerservice } from '../customerservice';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.html',
  styleUrl: './customer.css',
})
export class Customer {
  customers:any
  products:any
  constructor(ps:Customerservice) 
  {
    this.customers=ps.getAllCustomers();
    this.products=ps.getAllProducts();
  }
}
