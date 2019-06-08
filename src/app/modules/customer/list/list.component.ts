import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatProgressSpinnerModule, MatTableDataSource, MatDialog, MatPaginator, MatSort, PageEvent} from '@angular/material';
import {Customer} from '../../../models/customer';
import {Observable, of as observableOf, BehaviorSubject, merge, empty} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {DataSource} from '@angular/cdk/collections';
import {BlockUI, NgBlockUI } from 'ng-block-ui';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AddDialogCustomerComponent} from '.././add/add.dialog.component';
import {EditDialogCustomerComponent} from '.././edit/edit.dialog.component';
import {DeleteDialogCustomerComponent} from '.././delete/delete.dialog.component';
//import {ActivateDialogComponent} from '.././activate/activate.dialog.component';
import { MessageAlertHandleService } from '../../../services/message-alert.service';
import { CustomerService} from '../../../services/customer.service';
import { ResponseAllCustomersDto } from '../../../models/dto/responseAllCustomersDto';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = ['id', 'name', 'last_Name1', 'document_Number', 'telephone', 'email', 'status', 'actions'];  
  index: number;
  id: number;
  customerDatabase: CustomerDataBase | null;
  dataSource: MatTableDataSource<Customer>;
  filterSearch : string;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageEvent: PageEvent;
  

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public messageAlertHandleService: MessageAlertHandleService,
              public customerService: CustomerService
            ) {
              }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
      this.filterSearch = "";
      this.customerDatabase = new CustomerDataBase(this.httpClient, this.customerService, this.messageAlertHandleService);
      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      // Data
      this.changingData();
      if(this.dataSource != undefined){
          if(this.paginator != undefined){
            this.dataSource.paginator = this.paginator;
          }      
          if(this.sort != undefined){
            this.dataSource.sort = this.sort;
          }
      }else{
          this.dataSource = new MatTableDataSource();
      }      
    }

    changingData(){
          merge(this.sort.sortChange, this.paginator.page)
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isLoadingResults = true;
              return this.customerDatabase!.getCustomersList(
                this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filterSearch);
            }),
            map(data => {
              this.isLoadingResults = false;
              this.isRateLimitReached = false;
              this.resultsLength = data.totalRecords;
              return data.content;
            }),
            catchError(() => {
              this.isLoadingResults = false;
              this.isRateLimitReached = true;
              return observableOf([]);
            })
         ).subscribe(data => this.dataSource = new MatTableDataSource(data) );
    }
  
    applyFilter(filterValue: string) {
      this.paginator.pageIndex = 0
      this.filterSearch = filterValue;
      if(filterValue.trim().length == 0){
        this.customerService.getAllCustomersByLimit(this.paginator.pageIndex, this.paginator.pageSize ).subscribe(
            successData => {
              this.dataSource = new MatTableDataSource(successData.content) 
              this.resultsLength = successData.totalRecords;           
            },
            error => {
            },
            () => {}
        );
      }else{
          if((filterValue.trim().length % 2) == 0){
            this.customerService.searchAllCustomersByLimit(filterValue,this.paginator.pageIndex, this.paginator.pageSize ).subscribe(
                successData => {
                    this.dataSource = new MatTableDataSource(successData.content)
                    this.resultsLength = successData.totalRecords;  
                    console.log(this.resultsLength)            
                },
                error => {
                },
                () => {}
             );
          }
      }

        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }
    
    addNew(customer: Customer) {
        const dialogRef = this.dialog.open(AddDialogCustomerComponent, {
          data: {customer: customer }
        });  
        dialogRef.afterClosed().subscribe(result => {
          if (result === 1) {
            this.changingData();
          }
        });
    }

    startEdit(i: number, customer : Customer) {
        this.id = customer.id;
        this.index = i;
        const dialogRef = this.dialog.open(EditDialogCustomerComponent, {
          data: {id: customer.id, 
                name: customer.name, 
                last_Name1: customer.last_Name1, 
                document_Number: customer.document_Number, 
                telephone: customer.telephone, 
                email: customer.email,
                status: customer.status}
        });
        dialogRef.afterClosed().subscribe(result => {
          if (result === 1) {
            this.changingData();
          }
        });
    }

    deleteItem(i: number, customer : Customer) {
        this.id = customer.id;
        this.index = i;
        const dialogRef = this.dialog.open(DeleteDialogCustomerComponent, {
          data: {id: customer.id, 
                name: customer.name, 
                last_Name1: customer.last_Name1, 
                document_Number: customer.document_Number, 
                telephone: customer.telephone, 
                email: customer.email, 
                status: customer.status}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === 1) {            
              this.changingData();
          }
        });      
    }

    activateItem(i: number, customer : Customer) {
          
    }
    
    private refreshTable() {

    }

    getDescriptionIsActive(isActive : boolean) : string{
      return (isActive)?'Yes':'No';
    }
}


export class CustomerDataBase {
    pageSize : number = 20;

    constructor(private http: HttpClient, 
                private customerService: CustomerService,
                private messageAlertHandleService: MessageAlertHandleService) {}
                

    getCustomersList(sort: string, order: string, pageIndex: number, pageSize : number, filter : string): Observable<ResponseAllCustomersDto> {
        if(pageSize === undefined){
          pageSize = this.pageSize;
        }     
        if(filter.trim().length == 0){
            return this.customerService.getAllCustomersByLimit(pageIndex, pageSize)
                .pipe(map(
                      successData => {
                        return successData;
                      }
                    ),
                    catchError((err, caught) => {
                      return empty();
                    })
                );  
        }else{
          return this.customerService.searchAllCustomersByLimit(filter, pageIndex, pageSize)
              .pipe(map(
                    successData => {
                      return successData;
                    }
                  ),
                  catchError((err, caught) => {
                    return empty();
                  })
              );  
        }
        
                   
    }

    searchCustomersList(filter: string, pageIndex: number, pageSize : number): Observable<ResponseAllCustomersDto> {
        if(pageSize === undefined){
          pageSize = this.pageSize;
        }     

        return this.customerService.searchAllCustomersByLimit(filter, pageIndex, pageSize)
            .pipe(map(
                  successData => {
                    return successData;
                  }
                ),
                catchError((err, caught) => {
                  return empty();
                })
            );             
    }

  
}
