import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';
import { Product } from '../models/product';
import { RequestProductDto } from '../models/dto/requestProductDto';
import { ResponseAllProductDto } from '../models/dto/responseAllProductDto';
import { ResponseApi } from '../models/responseApi';

@Injectable()
export class ProductService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Product[]>(`${environment.apiUrl}/Products`);
    }

    getById(id: number) {
        return this.http.get(`${environment.apiUrl}/Products/` + id);
    }

    getProductByName(productName : string) {
        return this.http.get<Product>(`${environment.apiUrl}/Products/FindByName?ProductName=` + productName);
    }

    getProductByCategory(categoryId : number) {
        return this.http.get<Product>(`${environment.apiUrl}/Products/FindByCategory?categoryId=` + categoryId);
    }

    getAllProductsByLimit(offset : number, limit : number) {
        return this.http.get<ResponseAllProductDto>(`${environment.apiUrl}/Products?page=` + offset+'&size='+limit);        
    }

    getAllProducts(offset : number, limit : number) {
        return this.http.get<Product[]>(`${environment.apiUrl}/Products?page=` + offset+'&size='+limit);        
    }

    searchAllProductsByLimit(filter :string, offset : number, limit : number) {
        return this.http.get<ResponseAllProductDto>(`${environment.apiUrl}/Products/LikeSearchByName?page=` + offset+'&size='+limit+'&productName='+filter);        
    }

    addProduct(product: Product) {
        return this.http.post<ResponseApi>(`${environment.apiUrl}/Products`, product);
    }

    updateProduct(id : number, product: RequestProductDto) {
        return this.http.put<ResponseApi>(`${environment.apiUrl}/Products/` + id, product);
    }

    deleteProduct(id: number) {
        return this.http.delete<ResponseApi>(`${environment.apiUrl}/Products/` + id);
    }
}