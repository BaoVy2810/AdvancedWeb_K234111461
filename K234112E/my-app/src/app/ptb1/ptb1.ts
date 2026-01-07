import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb1',
  standalone: false,
  templateUrl: './ptb1.html',
  styleUrl: './ptb1.css',
})
export class Ptb1 {
  solution(a:number,b:number):string
  {
    if (a==0 && b==0)
      return "Tùm lum nghiệm";
    else if (a==0 && b!=0)
      return "Vô nghiệm";
    else
    {
      let x=-b/a
      return "No x="+x;
    }
  }
  get_solution(a:string,b:string,tdrs:HTMLElement)
  {
    let a_number=parseFloat(a);
    let b_number=parseFloat(b);
    let r=this.solution(a_number,b_number);
    tdrs.innerHTML=r;
  }
  clear_data(a:HTMLInputElement, b:HTMLInputElement, tdr:HTMLElement)
  {
    a.value="";
    b.value="";
    tdr.innerHTML="";
    a.focus();
  }
}
