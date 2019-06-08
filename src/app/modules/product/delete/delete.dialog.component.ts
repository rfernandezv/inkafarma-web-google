import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {BlockUI, NgBlockUI } from 'ng-block-ui';
import {Component, Inject} from '@angular/core';
import {ProductService} from '../../../services/product.service';
import {FormControl, Validators, FormGroup ,FormBuilder } from '@angular/forms';
import {Product} from '../../../models/product';
import {MessageAlertHandleService} from '../../../services/message-alert.service';
import * as HttpStatus from 'http-status-codes'

@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.html',
  styleUrls: ['./delete.dialog.css']
})
export class DeleteDialogProductComponent {
  @BlockUI() blockUI: NgBlockUI;
  deleteForm: FormGroup;
  submitted = false;

  constructor(public dialogRef: MatDialogRef<DeleteDialogProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Product, 
              public _messageAlertHandleService: MessageAlertHandleService,
              public _productService: ProductService) { }

  onNoClick(): void {
    this.dialogRef.close('x');
  }

  confirmDelete(): void {
    this.blockUI.start();

    this._productService.deleteProduct(this.data.id).subscribe(      
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
