import { Observable, throwError } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Employee } from '../../models/employee';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onLogout() {
    this.authService.logout();
  }

  getNombres() : String{
    if (sessionStorage.getItem('currentUser')) {
      var currentUser : Employee;
      currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      return currentUser.name + ' ' + currentUser.last_name1;
    }
    return "";
  }

  isRolAdmin() : boolean {
    if (sessionStorage.getItem('currentUser')) {
        var currentUser : Employee;
        currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if(currentUser.role_id == 1){
          return true;
        }
    }
    return false;
  }

  isRolVendedor() : boolean {
    if (sessionStorage.getItem('currentUser')) {
        var currentUser : Employee;
        currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if(currentUser.role_id == 2){
          return true;
        }
    }
    return false;
  }

  isRolAlmacen() : boolean {
    if (sessionStorage.getItem('currentUser')) {
        var currentUser : Employee;
        currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        if(currentUser.role_id == 3){
          return true;
        }
    }
    return false;
  }

}
