import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {SaveContact} from '../_services/contact.model';
import{UserService} from '../_services/user.service';
import { Router,ActivatedRoute,NavigationExtras} from '@angular/router'
export class Contact {
  constructor(
    public firstname: string,
    public lastname: string,
    public phonenumber: number,
    public email: string,
    public message: string
  ) { }
}
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html'
})
export class ContactUsComponent implements OnInit {
  @Output() contactdata = new EventEmitter<Contact>();
  contactForm: FormGroup;
  public obj: any = {};
  constructor(private fb: FormBuilder,private userSer:UserService,
    private route :ActivatedRoute,private router :Router) { }

  cont:SaveContact={
    firstname:'',
    lastname:'',
    phonenumber:null,
    email:'',
    message:'',
    id:null
  }
  ngOnInit() {
    this.contactForm = this.fb.group({
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      phonenumber: ["", [Validators.required]],
      email: ["", [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]],
      message:["",[Validators.required]]
    });
  }

  onSubmit() {
    this.obj = { ...this.contactForm.value, ...this.obj };
    this.contactForm.value;
    console.log(
      "LOG: LoginComponent -> onSubmit -> this.contactForm.value",
      this.contactForm.value
    );
     
     if (this.contactForm.valid) {
      this.contactdata.emit(
        new Contact(
          this.contactForm.value.firstname,
          this.contactForm.value.lastname,
          this.contactForm.value.phonenumber,
          this.contactForm.value.email,
          this.contactForm.value.message
        )
      );
      this.cont=this.contactForm.value;
      //console.log(this.cont);
      this.userSer.postcontactdata(this.cont).subscribe(
        (data:SaveContact)=>{
            console.log(data.firstname+"added");
        }
      );

    }
   window.location.href = "http://localhost:6565/contact";

  }
}
