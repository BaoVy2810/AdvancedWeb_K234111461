import { Component } from '@angular/core';
import { CustomerHttpService } from '../customer-http-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-customer-http-service',
  standalone: false,
  templateUrl: './list-customer-http-service.html',
  styleUrl: './list-customer-http-service.css',
})
export class ListCustomerHttpService {
  customers:any
  constructor(private csh:CustomerHttpService, private router:Router,private activeRouter:ActivatedRoute)
  {
    this.csh.get_all_customers().subscribe(
      {
        next: (data) => {
        console.log('DATA:', data);
        this.customers = data;}
      }
    )
  }
  view_detail(id:any)
  {
    this.router.navigate(["list-customer-http-service",id])
  }
}
