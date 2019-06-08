export class Product {
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
    FirebaseClientKey : string;

    constructor() {}

    public setId(value: number): Product {
        this.id = value;
        return this;
    }
    public setName(value: string): Product {
        this.name = value;
        return this;
    }
    public setPrice(value: number): Product {
        this.price = value;
        return this;
    }
    public setCurrency(value: string): Product {
        this.currency = value;
        return this;
    }
    public setStock(value: number): Product {
        this.stock = value;
        return this;
    }
    public setCategoryId(value: number): Product {
        this.category_id = value;
        return this;
    }
    public setLotNumber(value: string): Product {
        this.lot_number = value;
        return this;
    }
    public setRegistrationDate(value: string): Product {
        this.registration_date = value;
        return this;
    }
    public setExpirationDate(value: string): Product {
        this.expiration_date = value;
        return this;
    }
    public setStatus(value: number): Product {
        this.status = value;
        return this;
    }
    public setStockStatus(value: number): Product {
        this.stock_status = value;
        return this;
    }

    public setCurrencyISOCode(value: string): Product {
        this.currencyISOCode = value;
        return this;
    }

    public setFirebaseClientKey(value: string): Product {
        this.FirebaseClientKey = value;
        return this;
    }
}
