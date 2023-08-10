import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/Employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit{
  
  public employees!: Employee[];

  constructor(private employeeService:EmployeeServiceService){}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees():void{
    this.employeeService.getAllEmployees().subscribe(
      (res : Employee[] ) => {
        this.employees = res;
        console.log(this.employees);
    },
    (error:HttpErrorResponse)=>{
        alert(error.message+" error Url "+error.url);
    }
    );
  }
}
