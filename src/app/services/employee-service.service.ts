import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private httpClient:HttpClient) { }

  public getAllEmployees():Observable<Employee[]>{
    console.log(`${this.apiServerUrl}'/employee`);
    return this.httpClient.get<Employee[]>(`${this.apiServerUrl}/employee`);
  }

  public addEmployee(employee:Employee):Observable<Employee>{
    return this.httpClient.post<Employee>(`${this.apiServerUrl}/employee/add`,employee);
  }

  public updateEmployee(employee:Employee):Observable<Employee>{
    return this.httpClient.put<Employee>(`${this.apiServerUrl}/employee/update`,employee);
  }  

  public getEmployeeWithId(id:any):Observable<Employee>{
    return this.httpClient.get<Employee>(`${this.apiServerUrl}/employee/find/${id}`);
  }  

  public deleteEmployee(id:any):Observable<void>{
    return this.httpClient.delete<void>(`${this.apiServerUrl}/employee/delete/${id}`);
  }  
}
