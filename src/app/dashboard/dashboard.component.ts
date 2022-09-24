import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../model/employee.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  fromValue!: FormGroup;
  empobj: EmployeeModel = new EmployeeModel();

  empdata!: any;

  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.fromValue = this.formbuilder.group({
      firstname: [''],
      lastname: [''],
      email: [''],
    });
    this.displayEmployee();
  }
  createEmployeeDetails() {
    this.empobj.firstName = this.fromValue.value.firstname;
    this.empobj.LastName = this.fromValue.value.lastname;
    this.empobj.email = this.fromValue.value.email;

    this.api.postEmployee(this.empobj).subscribe(
      (res) => {
        console.log(res);
        alert('Employee was added Successfully!');
        this.fromValue.reset();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.displayEmployee();
      },
      (err) => {
        alert('Something went wrong, Try again!');
      }
    );
  }

  displayEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.empdata = res;
    });
  }
//delete an employee
  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe((res) => {
      alert('Employee was Deleted Sucessfully');
      this.displayEmployee();
    });
  }
  onEdit(row: any) {
    this.empobj.id = row.id;
    this.fromValue.controls['firstname'].setValue(row.firstName);
    this.fromValue.controls['lastname'].setValue(row.LastName);
    this.fromValue.controls['email'].setValue(row.email);
    this.showAdd = false;
    this.showUpdate = true;
  }
  //update employee details
  updateEmployeeDetails() {
    this.empobj.firstName = this.fromValue.value.firstname;
    this.empobj.LastName = this.fromValue.value.lastname;
    this.empobj.email = this.fromValue.value.email;
    this.api
      .updateEmployee(this.empobj, this.empobj.id)
      .subscribe((res) => {
        alert('Updated Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.displayEmployee();
      });
  }

  clickAddEmployee() {
    this.fromValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
}
