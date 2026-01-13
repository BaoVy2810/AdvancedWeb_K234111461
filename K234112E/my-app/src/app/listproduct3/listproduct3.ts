import { Component } from '@angular/core';
import { ProductHttpService } from '../product-http-service';

@Component({
  selector: 'app-listproduct3',
  standalone: false,
  templateUrl: './listproduct3.html',
  styleUrl: './listproduct3.css',
})
export class Listproduct3 {
  products:any;
  constructor(private pshttp:ProductHttpService) 
  {
    this.pshttp.get_all_products().subscribe({
      next:(data)=>this.products=data
    })
  }
}
