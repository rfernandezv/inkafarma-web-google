import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BlockUI, NgBlockUI } from 'ng-block-ui';
import {Component, Inject} from '@angular/core';
import {CustomerService} from '../../../services/customer.service';
import {FormControl, Validators, FormGroup ,FormBuilder } from '@angular/forms';
import {Customer} from '../../../models/customer';
import {MessageAlertHandleService} from '../../../services/message-alert.service';
import * as HttpStatus from 'http-status-codes'

@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.html',
  styleUrls: ['./delete.dialog.css']
})
export class DeleteDialogCustomerComponent {
  @BlockUI() blockUI: NgBlockUI;
  deleteForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<DeleteDialogCustomerComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Customer, 
              public _messageAlertHandleService: MessageAlertHandleService,
              public _customerService: CustomerService) { }

  onNoClick(): void {
    this.dialogRef.close('x');
  }

  confirmDelete(): void {
    this.blockUI.start();

    this._customerService.deleteCustomer(this.data.id).subscribe(      
        successData => {
          this.blockUI.stop();

          if(successData.response.httpStatus == HttpStatus.OK.toString() ){
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
}
