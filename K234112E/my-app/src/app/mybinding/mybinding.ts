import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mybinding',
  templateUrl: './mybinding.html',
  styleUrl: './mybinding.css',
  standalone: true,
  imports: [CommonModule]
})
export class Mybinding {
  public full_name:string="Tèo"
  public email:string="teo@gmail.com"
  public is_readonly:boolean=true
  public personal_style={
    color:"red",
    fontSize:"20pt",
    fontStyle:"italic"
  }
  get_fullname(
    fn:string,
    mn:string,
    ln:string,
    tdfn:HTMLElement)
    {
      tdfn.innerHTML=fn+" "+mn+" "+ln;
    }
}