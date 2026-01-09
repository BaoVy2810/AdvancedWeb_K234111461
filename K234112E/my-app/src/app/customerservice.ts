import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Customerservice {
  constructor() {}
  customers = 
  [ {"customerid":"C1","customername":"Bảo Vy"}
  ]
  products = 
  [ {"id":"p1","name":"lục trà sữa phô mai dẻo","price":100},
    {"id":"p2","name":"khô bò giòn","price":120},
    {"id":"p3","name":"sứa đạn","price":200},
    {"id":"p4","name":"trứng non","price":90}
  ]
  getAllCustomers() 
  {
    return this.customers;
  }
  getAllProducts() 
  {
    return this.products;
  }
}
