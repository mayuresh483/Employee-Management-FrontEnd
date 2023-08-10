import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/Employee';
import { EmployeeServiceService } from 'src/app/services/employee-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employees!: Employee[];
  editEmployee!: Employee;
  deleteEmployee!: Employee;

  setURL!: any;

  constructor(private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
    this.getEmployees();
    var imageURL = [
      "https://bootdey.com/img/Content/avatar/avatar1.png",
      "https://bootdey.com/img/Content/avatar/avatar3.png",
      "https://bootdey.com/img/Content/avatar/avatar7.png",
      "https://bootdey.com/img/Content/avatar/avatar2.png",
      "https://bootdey.com/img/Content/avatar/avatar6.png"
    ]

    var randomImage = Math.floor(Math.random() * imageURL.length);
    this.setURL = imageURL[randomImage];
  }

  public getEmployees(): void {
    this.employeeService.getAllEmployees().subscribe(
      (res: Employee[]) => {
        this.employees = res;
        console.log(this.employees);
      },
      (error: HttpErrorResponse) => {
        alert(error.message + " error Url " + error.url);
      }
    );
  }

  public onClickOnModel(employee: any, mode: string): void {
    const container = document.getElementById("main-container");
    const button = document.createElement("button");
    button.type = "button";
    button.style.display = "none";
    button.setAttribute("data-toggle", "modal");
    if (mode === "add") {
      button.setAttribute("data-target", "#addEmployeeModal");
    }
    if (mode === "edit") {
      button.setAttribute("data-target", "#updateEmployeeModal");
      this.editEmployee = employee;
    }
    if (mode === "delete") {
      button.setAttribute("data-target", "#deleteEmployeeModal");
      this.deleteEmployee = employee;
    }
    container?.append(button);
    button.click();
  }

  public onAddEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form')?.click();
    this.employeeService.addEmployee(addForm.value).subscribe(
      (res) => {
        alert("Added Successfully");
        this.getEmployees();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onUpdateEmployee(employeeData: Employee): void {
    document.getElementById('edit-employee-form')?.click();
    this.employeeService.updateEmployee(employeeData).subscribe(
      (res) => {
        alert("Updated Successfully");
        this.getEmployees();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteEmployee(id: any): void {
    this.employeeService.deleteEmployee(id).subscribe(
      (res) => {
        alert("Deleted Successfully");
        this.getEmployees();
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onSearchEmployee(key: string): void {
    var result: Employee[] = [];
    for (let employee of this.employees) {
      if (employee.name.toLowerCase().indexOf(key.toLowerCase()) != -1 ||
        employee.email.toLowerCase().indexOf(key.toLowerCase()) != -1 ||
        employee.phone.toLowerCase().indexOf(key.toLowerCase()) != -1 ||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase()) != -1) {
        result.push(employee);
      }
    }
    this.employees = result;

    if (!key) {
      this.getEmployees();
    }
  }
}
