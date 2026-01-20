import { Component } from '@angular/core';
import { FakeProductService } from '../myservices/fake-product-service';

@Component({
  selector: 'app-fake-product-component',
  standalone: false,
  templateUrl: './fake-product-component.html',
  styleUrl: './fake-product-component.css',
})
export class FakeProductComponent {
  data:any
  errMessage:string=''
  constructor(_service:FakeProductService){
    _service.getFakeProductData().subscribe({
      next:(data)=>{ this.data=data},
      error:(err)=>{
        this.errMessage=err
      }
    })
  }
}
