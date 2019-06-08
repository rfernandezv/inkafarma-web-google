import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { Customer } from '../models/customer';
import { RequestCustomerDto } from '../models/dto/requestCustomerDto';
import { ResponseAllCustomersDto } from '../models/dto/responseAllCustomersDto';
import { ResponseApi } from '../models/responseApi';

@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Customer[]>(`${environment.apiUrl}/Customers`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/Customers/` + id);
    }

    getCustomerByNumDoc(numDoc : string) {
        return this.http.get<Customer>(`${environment.apiUrl}/Customers/findByDocumentNumber?documentNumber=` + numDoc);
    }

    getAllCustomersByLimit(offset : number, limit : number) {
        return this.http.get<ResponseAllCustomersDto>(`${environment.apiUrl}/Customers?page=` + offset+'&size='+limit);        
    }

    searchAllCustomersByLimit(filter : string, offset : number, limit : number) {
        return this.http.get<ResponseAllCustomersDto>(`${environment.apiUrl}/Customers/LikeSearchByNameAndDocumentNumber?page=` + offset+'&size='+limit+'&Name='+filter);        
    }

    addCustomer(customer: Customer) {
        return this.http.post<ResponseApi>(`${environment.apiUrl}/Customers`, customer);
    }

    updateCustomer(id : number, customer: RequestCustomerDto) {        
        return this.http.put<ResponseApi>(`${environment.apiUrl}/Customers/` + id, customer);
    }

    deleteCustomer(id: number) {
        return this.http.delete<ResponseApi>(`${environment.apiUrl}/Customers/` + id);
    }
}