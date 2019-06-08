import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule  } from 'ngx-toastr';
import { BlockUIModule } from 'ng-block-ui';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AsyncPipe } from '../../node_modules/@angular/common';
import { MessagingFirebaseService } from './services/messaging-firebase.service';

import { PopupDialogComponent }  from './popup.dialog.component';
import { AppComponent }  from './app.component';
import { AppRoutingModule }        from './app.routing';
import { HeaderComponent } from '../app/components/header/header.component';

import { AddDialogCustomerComponent} from './modules/customer/add/add.dialog.component';
import { EditDialogCustomerComponent} from './modules/customer/edit/edit.dialog.component';
import { DeleteDialogCustomerComponent} from './modules/customer/delete/delete.dialog.component';

import { AddDialogProductComponent} from './modules/product/add/add.dialog.component';
import { EditDialogProductComponent} from './modules/product/edit/edit.dialog.component';
import { DeleteDialogProductComponent} from './modules/product/delete/delete.dialog.component';

import { AuthGuard } from './guards';
import { JwtInterceptor, ErrorInterceptor } from './helpers';
import { AuthenticationService, UserService, CustomerService, ProductService, SaleService } from './services';
import { MessageAlertHandleService } from './services/message-alert.service';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';

import { environment } from '../environments/environment';

import {
    MatCardModule, MatFormFieldModule, 
    MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatPaginatorModule, MatSortModule,
    MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatSelectModule,
    MatCheckboxModule, MatTableModule, MatToolbarModule, MAT_DIALOG_DATA, MatDialogRef
  } from '@angular/material';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        BlockUIModule.forRoot(
            {
              message: 'Please wait...'
            }
          ),

        MatCardModule,
        MatFormFieldModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatSelectModule,
        MatNativeDateModule,

        AngularFireDatabaseModule,
        AngularFireAuthModule,
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.firebase)
    ],
    exports: [
        MatDatepickerModule,
        MatSelectModule
      ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        HeaderComponent,
        PopupDialogComponent,
        AddDialogCustomerComponent,
        EditDialogCustomerComponent,
        DeleteDialogCustomerComponent,
        AddDialogProductComponent,
        EditDialogProductComponent,
        DeleteDialogProductComponent
    ],
    entryComponents: [
        AddDialogCustomerComponent,
        EditDialogCustomerComponent,
        DeleteDialogCustomerComponent,
        AddDialogProductComponent,
        EditDialogProductComponent,
        DeleteDialogProductComponent,
        PopupDialogComponent
      ],
    providers: [
        AuthGuard,
        AuthenticationService,
        MessageAlertHandleService,
        UserService,
        CustomerService,
        ProductService,
        SaleService,
        MessagingFirebaseService, AsyncPipe,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MatDialogRef, useValue: {} }, 
        { provide: MAT_DIALOG_DATA, useValue: {}}
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }