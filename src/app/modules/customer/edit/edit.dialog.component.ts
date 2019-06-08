import {MAT_DIALOG_DATA, MatDialogRef, MatDatepickerInputEvent} from '@angular/material';
import {Component, Inject, OnInit } from '@angular/core';
import {BlockUI, NgBlockUI } from 'ng-block-ui';
import {CustomerService} from '../../../services/customer.service';
import {FormControl, Validators, FormGroup ,FormBuilder } from '@angular/forms';
import {Customer} from '../../../models/customer';
import {RequestCustomerDto} from '../../../models/dto/requestCustomerDto';
import {MessageAlertHandleService} from '../../../services/message-alert.service';
import * as moment from 'moment';
import * as HttpStatus from 'http-status-codes'

@Component({
  selector: 'app-edit.dialog',
  templateUrl: './edit.dialog.html',
  styleUrls: ['./edit.dialog.css']
})
export class EditDialogCustomerComponent {
  @BlockUI() blockUI: NgBlockUI;
  editForm: FormGroup;
  requestCustomer: RequestCustomerDto;
  submitted = false;
  dateCustomer = new Date();

  constructor(public dialogRef: MatDialogRef<EditDialogCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Customer,
              private formBuilder: FormBuilder,
              public _messageAlertHandleService:MessageAlertHandleService ,
              public _customerService: CustomerService) { }

  ngOnInit() {
        this.editForm = this.formBuilder.group({
              name: ['', Validators.required],
              last_Name1: ['', Validators.required],
              document_Number: ['', Validators.required],
              telephone: ['', Validators.required],
              email: ['', Validators.required]
        });
        this.loadDataEdit();
  }

  get control() { return this.editForm.controls; }

  loadDataEdit(){
      this.control.name.setValue(this.data.name);
      this.control.last_Name1.setValue(this.data.last_Name1);
      this.control.document_Number.setValue(this.data.document_Number);
      this.control.telephone.setValue(this.data.telephone);
      this.control.email.setValue(this.data.email);      
  }

  preparateDataSubmit(){
    this.requestCustomer = new RequestCustomerDto()
          .setId(this.data.id)
          .setName(this.control.name.value)
          .setLastName1(this.control.last_Name1.value)
          .setLastName2("")
          .setDocumentNumber(this.control.document_Number.value)
          .setTelephone(this.control.telephone.value)
          .setEmail(this.control.email.value)
          .setStatus(this.data.status)
      ;
  }

  public onSubmit(): void {
        this.blockUI.start();
        this.preparateDataSubmit();  

        this._customerService.updateCustomer(this.data.id, this.requestCustomer).subscribe(
            successData => {              
                this.blockUI.stop();
                
                if(successData.response.httpStatus == HttpStatus.OK.toString()){
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

  public onNoClick(): void {
    this.dialogRef.close('x');
  }
}
