import { SaleDetail } from "../sale.detail";

export class requestSaleDto {
    id: number;
    sale_date : number;
    customer_id : number;
    employee_id : number;
    status : number;
    salesorderdetall : SaleDetail;
    
    constructor() {
    }

    public setId(value: number): requestSaleDto {
        this.id = value;
        return this;
    }
    public setSaleDate(value: number): requestSaleDto {
        this.sale_date = value;
        return this;
    }
    public setCustomerId(value: number): requestSaleDto {
        this.customer_id = value;
        return this;
    }
    public setEmployeeId(value: number): requestSaleDto {
        this.employee_id = value;
        return this;
    }
    public setStatus(value: number): requestSaleDto {
        this.status = value;
        return this;
    }
    public setSalesOrderDetail(value: SaleDetail): requestSaleDto {
        this.salesorderdetall = value;
        return this;
    }

}
