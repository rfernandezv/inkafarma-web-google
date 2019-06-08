export class RequestCustomerDto {
    id : number;
    name: string;
    last_Name1: string;
    last_Name2: string;
    document_Number : string;
    status : string;
    telephone: string;
    address : string;
    email : string;

    constructor() {}

    public setId(value: number): RequestCustomerDto {
        this.id = value;
        return this;
    }
    public setName(value: string): RequestCustomerDto {
        this.name = value;
        return this;
    }
    public setLastName1(value: string): RequestCustomerDto {
        this.last_Name1 = value;
        return this;
    }
    public setLastName2(value: string): RequestCustomerDto {
        this.last_Name2 = value;
        return this;
    }
    public setDocumentNumber(value: string): RequestCustomerDto {
        this.document_Number = value;
        return this;
    }
    public setStatus(value: string): RequestCustomerDto {
        this.status = value;
        return this;
    }
    public setTelephone(value: string): RequestCustomerDto {
        this.telephone = value;
        return this;
    }
    public setEmail(value: string): RequestCustomerDto {
        this.email = value;
        return this;
    }
    public setAddress(value: string): RequestCustomerDto {
        this.address = value;
        return this;
    }
}
