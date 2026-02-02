import { Component } from '@angular/core';
import { FakeProductService } from '../../myservices/fake-product-service';

@Component({
  selector: 'app-fake-product-version-2',
  standalone: false,
  templateUrl: './fake-product-version-2.html',
  styleUrl: './fake-product-version-2.css',
})
export class FakeProductVersion2 {
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
