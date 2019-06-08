export class Customer {
    id: number;
    name: string;
    last_Name1: string;
    last_Name2: string;
    address : string;
    document_Number : string;
    status : string;
    telephone: string;
    email : string;


    constructor() {
        this.id = 0;
        this.name = "";
        this.last_Name1 = "";
        this.last_Name2 = "";
        this.address = "";
        this.document_Number = "";
        this.email = "";
    }

    public setId(value: number): Customer {
        this.id = value;
        return this;
    }

    public setName(value: string): Customer {
        this.name = value;
        return this;
    }
    public setLast_Name1(value: string): Customer {
        this.last_Name1 = value;
        return this;
    }
    public setLast_Name2(value: string): Customer {
        this.last_Name2 = value;
        return this;
    }
    public setAddress(value: string): Customer {
        this.address = value;
        return this;
    }
    public setDocumentNumber(value: string): Customer {
        this.document_Number = value;
        return this;
    }
    public setStatus(value: string): Customer {
        this.status = value;
        return this;
    }
    public setTelephone(value: string): Customer {
        this.telephone = value;
        return this;
    }
    public setEmail(value: string): Customer {
        this.email = value;
        return this;
    }

}
