import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { ListComponent as ListComponentCustomer } from './modules/customer/list/list.component';
import { ListComponentProduct } from './modules/product/list/list.component';
import { SaleComponent } from './modules/sale/sale.component';

import { AuthGuard } from './guards';
import { CustomerModule } from './modules/customer/customer.module';
import { ProductModule } from './modules/product/product.module';
import { SaleModule } from './modules/sale/sale.module';


const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'product/list', component: ListComponentProduct, canActivate: [AuthGuard] },
    { path: 'customer/list', component: ListComponentCustomer, canActivate: [AuthGuard] },
    { path: 'sale', component: SaleComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [    
      RouterModule.forRoot(appRoutes)
    ],
    exports: [
      CustomerModule,
      ProductModule,
      SaleModule,
      RouterModule
    ]
  })
  export class AppRoutingModule { }