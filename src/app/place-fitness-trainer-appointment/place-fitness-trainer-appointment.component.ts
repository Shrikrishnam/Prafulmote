import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";
import { UserService } from '../_services';
import { Appointment } from '../_services/appointment.model';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router'

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public age: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) { }
}

@Component({
  selector: 'app-place-fitness-trainer-appointment',
  templateUrl: './place-fitness-trainer-appointment.component.html'

})
export class PlaceFitnessTrainerAppointmentComponent implements OnInit {

  fitnessForm: FormGroup

  constructor(private userServ: UserService,
    private route: ActivatedRoute, private router: Router) { }
  ngOnInit() {

    this.fitnessForm = new FormGroup(
      {
        firstname: new FormControl(this.userServ.currentApp.firstname, [Validators.required, Validators.pattern("[A-Za-z]+")]),
        lastname: new FormControl(this.userServ.currentApp.lastname, [Validators.required, Validators.pattern("[A-Za-z]+")]),
        age: new FormControl(this.userServ.currentApp.age, [Validators.required, this.ageValidation]),
        email: new FormControl(this.userServ.currentApp.email, [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]),
        streetaddress: new FormControl(this.userServ.currentApp.streetaddress, [Validators.required]),
        pincode: new FormControl(this.userServ.currentApp.pincode, [Validators.required,this.pinValidation]),
        packages: new FormControl(this.userServ.currentApp.packages, [Validators.required]),
        trainerpreference: new FormControl(this.userServ.currentApp.trainerpreference),
        physiotherapist: new FormControl(this.userServ.currentApp.physiotherapist),
        inr: new FormControl(this.userServ.currentApp.inr, [Validators.required]),
        paisa: new FormControl(this.userServ.currentApp.paisa, [Validators.required]),
        city: new FormControl(this.userServ.currentApp.city, [Validators.required]),
        state: new FormControl(this.userServ.currentApp.state, [Validators.required]),
        country:new FormControl(this.userServ.currentApp.country, [Validators.required]),
        phonenumber:new FormControl(this.userServ.currentApp.phonenumber, [Validators.required])
      }
      /*Validators.compose([
          Validators.required,
          Validators.pattern("[^ @]*@[^ @]*")
       ])*/
    )

  }
  ageValidation(formcontrol) {
    if (formcontrol.value <= 18 || formcontrol.value >= 60) {  //if condittion contains the sitiation which makes the the invalid expressions true i.e negation
      return { "age": true };
    }
  }
  pinValidation(formcontrol) {
    if (formcontrol.value != null)
      if (formcontrol.value.length < 6 || formcontrol.value.length > 6) {
        return { "pincode": true }
      }

  }

  onClickSubmit(currentApp: Appointment) {
    //alert("the email.id is "+data.email);
    if (currentApp.id != null)
      this.updateAppointment(currentApp);
    else
      this.createAppointment(currentApp);

  }
  createAppointment(currentApp: Appointment) {
    this.userServ.postfitnessdata(currentApp).subscribe(
      (data: Appointment) => {
        console.log(data.firstname + " added");

      }

    )
    this.router.navigate(['../view-appointment'], { relativeTo: this.route });
  }
  updateAppointment(currentApp: Appointment) {
    this.userServ.updatefitnessdata(currentApp).subscribe();
    this.router.navigate(['../view-appointment'], { relativeTo: this.route });

  }
  clear() {
    this.userServ.currentApp = {
      firstname: '',
      lastname: '',
      age: null,
      email: '',
      streetaddress: "",
      pincode: null,
      packages: '',
      trainerpreference: '',
      physiotherapist: '',
      inr: null,
      paisa: null,
      city: '',
      state: '',
      country: '',
      phonenumber:null,
      id: null,
    }
  }
}


