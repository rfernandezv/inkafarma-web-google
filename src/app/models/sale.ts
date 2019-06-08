import { SaleDetail } from "./sale.detail";

export class Sale {
    id: number;
    sale_date : number;
    customer_id : number;
    employee_id : number;
    status : number;
    salesorderdetall : SaleDetail[];
    
    constructor() {
        this.salesorderdetall = [];
    }

    public setId(value: number): Sale {
        this.id = value;
        return this;
    }
    public setSaleDate(value: number): Sale {
        this.sale_date = value;
        return this;
    }
    public setCustomerId(value: number): Sale {
        this.customer_id = value;
        return this;
    }
    public setEmployeeId(value: number): Sale {
        this.employee_id = value;
        return this;
    }
    public setStatus(value: number): Sale {
        this.status = value;
        return this;
    }
    public setSalesOrderDetail(value: SaleDetail[]): Sale {
        this.salesorderdetall = value;
        return this;
    }

}
