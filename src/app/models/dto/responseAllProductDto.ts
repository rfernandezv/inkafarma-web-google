import { Product } from "../product";

export class ResponseAllProductDto {
    currentPage: number;
    pageSize: number;
    totalRecords: number;    
    totalPages: number;
    content: Product[];

    constructor() {}
}
