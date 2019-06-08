import {MAT_DIALOG_DATA, MatDialogRef, MatDatepickerInputEvent} from '@angular/material';
import {Component, Inject, OnInit } from '@angular/core';
import {BlockUI, NgBlockUI } from 'ng-block-ui';
import {CustomerService} from '../../../services/customer.service';
import {FormControl, Validators, FormGroup ,FormBuilder } from '@angular/forms';
import {Customer} from '../../../models/customer';
import {MessageAlertHandleService} from '../../../services/message-alert.service';
import * as moment from 'moment';
import * as HttpStatus from 'http-status-codes'

@Component({
  selector: 'app-add.dialog',
  templateUrl: './add.dialog.html',
  styleUrls: ['./add.dialog.css']
})


export class AddDialogCustomerComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  createForm: FormGroup;
  submitted = false;
  dateCustomer = new Date();

  constructor(public dialogRef: MatDialogRef<AddDialogCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Customer,
              private formBuilder: FormBuilder,
              public _messageAlertHandleService:MessageAlertHandleService ,
              public _customerService: CustomerService) { }

  ngOnInit() {
        this.createForm = this.formBuilder.group({
              name: ['', Validators.required],
              last_Name1: ['', Validators.required],
              document_Number: ['', Validators.required],
              telephone: ['', Validators.required],
              email: ['', Validators.required]
        });
  }

  get control() { return this.createForm.controls; }

  onNoClick(): void {
    this.dialogRef.close('x');
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateCustomer = event.value;
  }

  preparateDataSubmit(){
      this.data.name = this.control.name.value;
      this.data.last_Name1 = this.control.last_Name1.value;
      this.data.last_Name2 = "";
      this.data.document_Number = this.control.document_Number.value;
      this.data.email = this.control.email.value;
      this.data.telephone = this.control.telephone.value;
      this.data.status = "1";
  }

  public onSubmit(): void {
        this.submitted = true
        this.blockUI.start();        
        this.preparateDataSubmit();
        this._customerService.addCustomer(this.data).subscribe(

          successData => {              
              this.blockUI.stop();
              if(successData.response.httpStatus == HttpStatus.CREATED.toString()){
                this.updateNewCustomer(this.data.document_Number);
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

  updateNewCustomer(document : string){
    this._customerService.getCustomerByNumDoc(document).subscribe(
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
