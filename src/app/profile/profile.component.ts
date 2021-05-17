import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from '../register/register.component';
import { DemoAppServiceService } from '../service/demo-app-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
userdata
imagePath;
id=1;
userintrest;
  constructor(private Demoservice:DemoAppServiceService,private Dialog:MatDialog) { }

  ngOnInit() {
this.getAlldata();
  }
getdata(id){
  this.Demoservice.getData(id).subscribe((data:any[])=>{
  this.userdata=data;
  this.imagePath=this.userdata.image;
  if(this.userdata.intrest.length>0){
  this.userintrest="I like to play "
  for(let i=0;i<this.userdata.intrest.length;i++){
    this.userintrest=this.userintrest+" "+this.userdata.intrest[i];
  }
  }
  else{
    this.userintrest="";
  }
  console.log(this.userdata)
  })
}

getAlldata(){
  var Alldata;
  this.Demoservice.getAllData().subscribe((data:any[])=>{
    Alldata=data;
    this.id=Alldata.length;
    this.getdata(Alldata[this.id-1].id)
    this.id=Alldata[this.id-1].id;
  })
}
editprofile(){
  this.Dialog.open(RegisterComponent,{
    height: '800px',
    data: { name: 'Edit Profile',id:this.id },
  }
  ) 
}

}
