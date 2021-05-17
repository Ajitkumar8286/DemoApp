import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { DemoAppServiceService } from '../service/demo-app-service.service';

declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
showpopup=true;
  constructor(private Demoservice:DemoAppServiceService,private Dialog:MatDialog) { }

  ngOnInit() {
  }
register(){
  // $('#myModal').modal('show')
  // this.Demoservice.opendialog();
  this.Dialog.open(RegisterComponent,{
    height: '800px',
    data: { name: 'Register' },
  }
  )
  
  
}
}
