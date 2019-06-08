import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { Sale } from '../models/sale';
import { requestSaleDto } from '../models/dto/requestSaleDto';
import { ResponseSale } from '../models/response.Sale';

@Injectable()
export class SaleService {
    constructor(private http: HttpClient) { }

    newSale(sale: Sale) {
        return this.http.post<ResponseSale>(`${environment.apiUrlJava}/sales/order`, sale);
    }

    newSaleSimplified(sale: requestSaleDto) {
        return this.http.post<ResponseSale>(`${environment.apiUrlJava}/sales/order`, sale);
    }

}