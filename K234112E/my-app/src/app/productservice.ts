import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Productservice {
  constructor() {}
  products = 
  [ {"id":"p1","name":"coca","quantity":10,"price":100},
    {"id":"p2","name":"pepsi","quantity":8,"price":120},
    {"id":"p3","name":"sting","quantity":12,"price":90},
    {"id":"p4","name":"aqua","quantity":7,"price":90},
    {"id":"p5","name":"lavie","quantity":6,"price":85}
  ]
  getAllProducts() 
  {
    return this.products;
  }
}
