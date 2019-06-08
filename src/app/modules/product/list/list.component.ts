import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatProgressSpinnerModule, MatTableDataSource, MatDialog, MatPaginator, MatSort, PageEvent} from '@angular/material';
import {Product} from '../../../models/product';
import {Observable, of as observableOf, BehaviorSubject, merge, empty} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import {DataSource} from '@angular/cdk/collections';
import {BlockUI, NgBlockUI } from 'ng-block-ui';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AddDialogProductComponent} from '.././add/add.dialog.component';
import {EditDialogProductComponent} from '.././edit/edit.dialog.component';
import {DeleteDialogProductComponent} from '.././delete/delete.dialog.component';
import { MessageAlertHandleService } from '../../../services/message-alert.service';
import { ProductService} from '../../../services/product.service';
import { ResponseAllProductDto } from '../../../models/dto/responseAllProductDto';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponentProduct implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  displayedColumns = ['id', 'name', 'currencyISOCode', 'price', 'stock', 'status', 'actions'];  
  index: number;
  id: number;
  productDatabase: ProductDataBase | null;
  dataSource: MatTableDataSource<Product>;
  filterSearch : string;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageEvent: PageEvent;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public messageAlertHandleService: MessageAlertHandleService,
              public productService: ProductService
            ) {
              }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
      this.filterSearch = "";
      this.productDatabase = new ProductDataBase(this.httpClient, this.productService, this.messageAlertHandleService);
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
              return this.productDatabase!.getProductList(
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
          this.productService.getAllProductsByLimit(this.paginator.pageIndex, this.paginator.pageSize ).subscribe(
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
              this.productService.searchAllProductsByLimit(filterValue,this.paginator.pageIndex, this.paginator.pageSize ).subscribe(
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
    
    addNew(product: Product) {
      
        const dialogRef = this.dialog.open(AddDialogProductComponent, {
          data: {product: product }
        });  
        dialogRef.afterClosed().subscribe(result => {
          if (result === 1) {
            this.changingData();
          }
        });
        
    }

    startEdit(i: number, product : Product) {
        this.id = product.id;
        this.index = i;
        const dialogRef = this.dialog.open(EditDialogProductComponent, {
          data: {id: product.id, 
                name: product.name, 
                price: product.price, 
                currency: product.currency, 
                stock: product.stock, 
                currencyISOCode : product.currencyISOCode,
                category_id: product.category_id,
                lot_number: product.lot_number,
                sanitary_registration_number: product.sanitary_registration_number,
                registration_date: product.registration_date,
                expiration_date: product.expiration_date,
                status: product.status,
                stock_status: product.stock_status
               }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === 1) {
            this.changingData();
          }
        });
    }

    deleteItem(i: number, product : Product) {
      
        this.id = product.id;
        this.index = i;
        const dialogRef = this.dialog.open(DeleteDialogProductComponent, {
          data: {id: product.id, 
                name: product.name, 
                price: product.price, 
                currency: product.currency, 
                stock: product.stock, 
                currencyISOCode : product.currencyISOCode,
                category_id: product.category_id,
                lot_number: product.lot_number,
                sanitary_registration_number: product.sanitary_registration_number,
                registration_date: product.registration_date,
                expiration_date: product.expiration_date,
                status: product.status,
                stock_status: product.stock_status
              }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result === 1) {            
              this.changingData();  
          }
        });
      
    }

    activateItem(i: number, product : Product) {
          
    }
    
    private refreshTable() {

    }

    getDescriptionIsActive(isActive : boolean) : string{
      return (isActive)?'Yes':'No';
    }
}

export class ProductDataBase {
  pageSize : number = 20;

  constructor(private http: HttpClient, 
              private productService: ProductService,
              private messageAlertHandleService: MessageAlertHandleService) {}
              

  getProductList(sort: string, order: string, pageIndex: number, pageSize : number, filter : string): Observable<ResponseAllProductDto> {
      if(pageSize === undefined){
        pageSize = this.pageSize;
      }
      if(filter.trim().length == 0){
          return this.productService.getAllProductsByLimit( pageIndex, pageSize)
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
        return this.productService.searchAllProductsByLimit( filter, pageIndex, pageSize)
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

  searchProductList(productName : string, pageIndex: number, pageSize : number): Observable<ResponseAllProductDto> {
      if(pageSize === undefined){
        pageSize = this.pageSize;
      }
 
      return this.productService.searchAllProductsByLimit( productName, pageIndex, pageSize)
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
