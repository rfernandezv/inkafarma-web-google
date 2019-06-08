export class RequestProductDto {
    id: number;
    name: string;
    price: number;
    currency : string;
    currencyISOCode : string;
    stock : number;
    category_id : number;
    lot_number: string;
    sanitary_registration_number : string;
    registration_date : string;
    expiration_date : string;
    status : number;    
    stock_status : number;

    constructor() {}

    public setId(value: number): RequestProductDto {
        this.id = value;
        return this;
    }
    public setName(value: string): RequestProductDto {
        this.name = value;
        return this;
    }
    public setPrice(value: number): RequestProductDto {
        this.price = value;
        return this;
    }
    public setCurrency(value: string): RequestProductDto {
        this.currency = value;
        return this;
    }
    public setStock(value: number): RequestProductDto {
        this.stock = value;
        return this;
    }
    public setCategoryId(value: number): RequestProductDto {
        this.category_id = value;
        return this;
    }
    public setLotNumber(value: string): RequestProductDto {
        this.lot_number = value;
        return this;
    }
    public setSanitaryRegistrationNumber(value: string): RequestProductDto {
        this.sanitary_registration_number = value;
        return this;
    }
    public setRegistrationDate(value: string): RequestProductDto {
        this.registration_date = value;
        return this;
    }
    public setExpirationDate(value: string): RequestProductDto {
        this.expiration_date = value;
        return this;
    }
    public setStatus(value: number): RequestProductDto {
        this.status = value;
        return this;
    }
    public setStockStatus(value: number): RequestProductDto {
        this.stock_status = value;
        return this;
    }
}
