import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  public form !: FormGroup
  constructor(private router:Router,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email : ['',Validators.required],
      password: ['',Validators.required]
    })
  }

  ademail : string = '';
  adpass : string = '';
  login(){
    if(this.ademail == "admin@email.com" && this.adpass== "admin123")
    {
      this.router.navigate(["/login"]);
    }
  }

}
