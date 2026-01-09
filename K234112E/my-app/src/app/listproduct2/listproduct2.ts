import { Component } from '@angular/core';
import { Productservice } from '../productservice';

@Component({
  selector: 'app-listproduct2',
  standalone: false,
  templateUrl: './listproduct2.html',
  styleUrl: './listproduct2.css',
})
export class Listproduct2 {
  products:any
    constructor(ps:Productservice) 
    {
      this.products=ps.getAllProducts();
    }
}
