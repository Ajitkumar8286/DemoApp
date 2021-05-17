import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RegisterComponent } from '../register/register.component';

@Injectable({
  providedIn: 'root'
})
export class DemoAppServiceService {
  mokurl='http://localhost:3000/User';
  user:any={
    id: null,
      firstname: "",
      lastname: "",
      Email:"",
      Age:"",
      State:"",
      Country:"",
      Address:"",
      Address1:"",
      Address2:"",
      tags:"",
      Contact: ""
    }
    id=2;
  constructor(private http:HttpClient) { }
  AddData(adddata:any):Observable<any>{
    return this.http.post<any>(this.mokurl,adddata)
  }
  getAllData():Observable<any[]>{
    return this.http.get<any[]>(this.mokurl);
  }
  getData(id):Observable<any[]>{
  
    return this.http.get<any[]>(this.mokurl+'/'+id);
  }
  updateData(id,adddata:any):Observable<any>{
    return this.http.put<any>(this.mokurl+'/'+id,adddata)
  }
}
