import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { MatTableDataSource } from '@angular/material';


@Component({
  selector: 'app-employees-screen',
  templateUrl: './employees-screen.component.html',
  styleUrls: ['./employees-screen.component.css']
})
export class EmployeesScreenComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }
  displayedColumns: string[] = ['name', 'age', 'address'];
  userList = this.authService.updateUsersList();
  dataSource = new MatTableDataSource(this.userList);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngOnInit() {}
}

