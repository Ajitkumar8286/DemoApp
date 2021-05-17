import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
// import { read } from 'fs';
import { DemoAppServiceService } from '../service/demo-app-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Age=20;
  imagePath:string="";
  Address=""
  Intrest=["Cricket", "Football", "Hockey"];
  State=["Maharashtra","Gujrat","punjab","MP"];
  Country=["Angola","Algeria","Austria","Brazil","India"]
  RegisterForm;
  valid='false'
  validPattern = "^[a-zA-Z]$";
  imgerror=false
  constructor(private _router: Router,private Demoservice:DemoAppServiceService,
    private _fb: FormBuilder,private Dialog:MatDialog,public dialogRef: MatDialogRef<MatDialog>,
    @Inject(MAT_DIALOG_DATA) public data: {name: string,id:number}) { }

  ngOnInit() {
    this.createForm();
    if(this.data.id!=null||this.data.id!=undefined){
      this.getdata(this.data.id);
    }
    
    
  }
  createForm() {
    this.RegisterForm = this._fb.group({
      firstname: ["",[Validators.required,Validators.maxLength(20)]],
      lastname: ["",[Validators.required]],
      // image: ["",[Validators.required]],
      Email: ["",[Validators.required]],
      Contact: ["",[Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      Age: ["",[Validators.required]],
      tags: ["",[Validators.required]],
      Country: ["",[Validators.required]],
      State: ["",[Validators.required]],
      Address: ["",[Validators.required]],
      Address1: ["",[Validators.required]],
      Address2:["",[Validators.required]]
    })
  }
  onSelectedFile(event) {
    if (event.target.files.length > 0 ) {
      if((event.target.files[0].size/1024)<11){
        this.imgerror=false;
      const file = event.target.files[0];
      var reader=new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(events:any)=>{
        this.imagePath=events.target.result
        // this.RegisterForm.patchValue({
        //   image:this.imagePath
        // });
      }

      // this.RegisterForm.get('image').setValue(file);
      // this.imagePath=event.target.value;
    }
    else{
      this.imgerror=true;
    }
  }
  }
  RemoveIntrest(intr){
    var index=this.Intrest.indexOf(intr);
    this.Intrest.splice(index,1);
  }
  onSubmit(){
    console.log(this.RegisterForm.controls)
    
    // this.AddProduct();
    this.AddAndUpdate(this.RegisterForm.controls);
    
  }

  AddAndUpdate(product:any){
    if(this.data.id!=null){
      this.updateProduct(product);    
          }
          else{
      this.AddProduct();
          }
  }
  updateProduct(product:any){
    if(this.RegisterForm.valid){
      var userdata=this.RegisterForm.getRawValue();
      userdata.image=this.imagePath;
      userdata.intrest=this.Intrest;
    this.Demoservice.updateData(this.data.id,userdata).subscribe();
    this.closepoup();
  }else{
    window.alert("Please Enter All Details");
  }
}
  
  AddProduct(){
    if(this.RegisterForm.valid){
    var data=this.RegisterForm.getRawValue();
    data.image=this.imagePath;
    data.intrest=this.Intrest;
    this.Demoservice.AddData(data).subscribe();
    this.closepoup();
    this._router.navigate(['profile']);
  }else{
    window.alert("Please Enter All Details");
  }
  }
closepoup(){
  setTimeout(() => {
    this.dialogRef.close('close!');
  }, 1000);
}
  getdata(id){
    var userdata
    this.Demoservice.getData(id).subscribe((data:any[])=>{
    userdata=data;
    console.log(userdata);
    this.imagePath=userdata.image;
    this.Intrest=userdata.intrest;
    this.RegisterForm.patchValue({
      firstname: userdata.firstname,
      lastname: userdata.lastname,
      Email: userdata.Email,
      Contact:userdata.Contact ,
      Age:userdata.Age,
      tags: userdata.tags,
      Country: userdata.Country,
      State: userdata.State,
      Address: userdata.Address,
      Address1: userdata.Address1,
      Address2:userdata.Address2
    })
    })
  }
  get RegisterFormControl(){ return this.RegisterForm.controls}


 charonly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)) {
    return true;
  }
  return false;

}
 numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;

}
}
