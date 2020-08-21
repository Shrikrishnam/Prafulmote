import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services';
import { Appointment } from '../_services/appointment.model';
import { Router,ActivatedRoute,NavigationExtras} from '@angular/router'


@Component({
  selector: 'app-view-appointment',
  templateUrl: './view-appointment.component.html'
})
export class ViewAppointmentComponent implements OnInit {

  constructor(private userServObj :UserService,private route :ActivatedRoute,private router :Router) { }

  allApmts:Appointment[];

  ngOnInit() {
    
    this.getfitness();
    

  }
  
  getfitness() {
    this.userServObj.getfitnessdata().subscribe(
      (data:Appointment[])=>{
        this.allApmts=data;
      }
    );
      
    }

    onEdit(app){
      this.userServObj.currentApp= Object.assign({},app);
      this.router.navigate(['../place-fitness-trainer-appointment'],{relativeTo:this.route})
      //window.location.href = "http://localhost:4200/place-fitness-trainer-appointment";
      
    }
    onDelete(id:number){
      this.userServObj.deletefitnessdata(id).subscribe(
        (data:Appointment)=>{
          console.log(data.firstname + " deleted")
        }
      );
      this.getfitness();
    }
}

