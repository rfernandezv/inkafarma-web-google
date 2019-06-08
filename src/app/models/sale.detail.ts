export class SaleDetail {
    id: number;
    sale_order_id : number;
    product_id : number;
    productName : string;
    quantity : number;
    currency : string;
    price : number;
    status : number;

    constructor() {}

    public setId(value: number): SaleDetail {
        this.id = value;
        return this;
    }
    public setSaleOrderId(value: number): SaleDetail {
        this.sale_order_id = value;
        return this;
    }
    public setProductId(value: number): SaleDetail {
        this.product_id = value;
        return this;
    }
    public setQuantity(value: number): SaleDetail {
        this.quantity = value;
        return this;
    }
    public setCurrency(value: string): SaleDetail {
        this.currency = value;
        return this;
    }
    public setPrice(value: number): SaleDetail {
        this.price = value;
        return this;
    }
    public setStatus(value: number): SaleDetail {
        this.status = value;
        return this;
    }
    public setProductName(value: string): SaleDetail {
        this.productName = value;
        return this;
    }
}
