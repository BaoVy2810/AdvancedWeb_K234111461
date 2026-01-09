import { Component } from '@angular/core';
import { Productservice } from '../productservice';

@Component({
  selector: 'app-listproduct1',
  standalone: false,
  templateUrl: './listproduct1.html',
  styleUrl: './listproduct1.css',
})
export class Listproduct1 {
  products:any
  constructor(ps:Productservice) 
  {
    this.products=ps.getAllProducts();
  }
}