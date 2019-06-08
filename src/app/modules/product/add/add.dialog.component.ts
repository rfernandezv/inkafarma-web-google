import {MAT_DIALOG_DATA, MatDialogRef, MatDatepickerInputEvent} from '@angular/material';
import {Component, Inject, OnInit } from '@angular/core';
import {BlockUI, NgBlockUI } from 'ng-block-ui';
import {ProductService} from '../../../services/product.service';
import {FormControl, Validators, FormGroup ,FormBuilder } from '@angular/forms';
import {Product} from '../../../models/product';
import {Currency} from '../../../models/currency';
import {CategoryProduct} from '../../../models/categoryProduct';
import {MessageAlertHandleService} from '../../../services/message-alert.service';
import * as moment from 'moment';
import * as HttpStatus from 'http-status-codes'

@Component({
  selector: 'app-add-product.dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.css']
})


export class AddDialogProductComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  createForm: FormGroup;
  submitted = false;
  dateRegistration = new Date();
  dateExpiration = new Date();
  currencyList: Currency[] = [
    {value: 604, viewValue: 'Soles'},
    {value: 840, viewValue: 'Dólares'},
    {value: 978, viewValue: 'Euros'}
  ];
  categoryList: CategoryProduct[] = [
    {value: 1, viewValue: 'Analgésicos'},
    {value: 2, viewValue: 'Antiácidos y antiulcerosos'},
    {value: 3, viewValue: 'Antialérgicos'},
    {value: 4, viewValue: 'Antidiarreicos y laxantes'},
    {value: 5, viewValue: 'Antiinfecciosos'},
    {value: 6, viewValue: 'Antiinflamatorios'},
    {value: 7, viewValue: 'Antipiréticos'},
    {value: 8, viewValue: 'Antitusivos y mucolíticos'}
  ];

  constructor(public dialogRef: MatDialogRef<AddDialogProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product,
              private formBuilder: FormBuilder,
              public _messageAlertHandleService:MessageAlertHandleService ,
              public _productService: ProductService) { }

  ngOnInit() {
        this.createForm = this.formBuilder.group({
              name: ['', Validators.required],
              price: ['', Validators.required],
              currency: ['', Validators.required],
              stock: ['', Validators.required],
              categoryId: ['', Validators.required],
              lotNumber: ['', Validators.required],
              sanitaryRegistrationNumber: ['', Validators.required],
              expirationDate: ['', Validators.required]  
        });
  }

  get control() { return this.createForm.controls; }

  onNoClick(): void {
    this.dialogRef.close('x');
  }

  addEventExpiration(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateExpiration = event.value;
  }

  preparateDataSubmit(){
      this.data.name = this.control.name.value;
      this.data.stock = this.control.stock.value;
      this.data.price = this.control.price.value;
      this.data.currency = this.control.currency.value;
      this.data.category_id = this.control.categoryId.value;
      this.data.lot_number = this.control.lotNumber.value;
      this.data.sanitary_registration_number = this.control.sanitaryRegistrationNumber.value;
      if(this.dateRegistration != null){          
        this.data.registration_date = moment(this.dateRegistration).format('YYYY-MM-DD');
      }
      if(this.dateExpiration != null){          
        this.data.expiration_date = moment(this.dateExpiration).format('YYYY-MM-DD');
      }
      this.data.status = 1;
      this.data.stock_status = 1;
      this.data.FirebaseClientKey = sessionStorage.getItem('tokenFirebase');
  }

  public onSubmit(): void {
        this.submitted = true
        this.blockUI.start();        
        this.preparateDataSubmit();
        this._productService.addProduct(this.data).subscribe(

          successData => {              
              this.blockUI.stop();
              if(successData.response.httpStatus == HttpStatus.CREATED.toString()){
                this.updateNewProduct(this.data.name);
                this._messageAlertHandleService.handleSuccess(successData.response.message);
                this.dialogRef.close(1);
              }else{
                this._messageAlertHandleService.handleError(successData.response.message);
              }
          },
          error => {
              this.blockUI.stop();
          },
          () => {}
      );
      
  }

  updateNewProduct(name : string){
    this._productService.getProductByName(name).subscribe(
        successData => {
            if(successData != null){
              this.data.id = successData.id;
            }
        },
        error => {},
        () => {}
    );
  }
}
