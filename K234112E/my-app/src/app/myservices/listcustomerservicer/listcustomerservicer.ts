import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customerservice } from '../customerservice';

@Component({
  selector: 'app-listcustomerservicer',
  standalone: false,
  templateUrl: './listcustomerservicer.html',
  styleUrl: './listcustomerservicer.css',
})
export class Listcustomerservicer {
  customers:any=[];
  constructor(private cs: Customerservice,private router:Router,private route:ActivatedRoute) 
  {
    this.customers=this.cs.get_all_customers();
  }
  view_detail(id:any)
  {
    this.router.navigate(["list-customer-service",id]);
  }
}
