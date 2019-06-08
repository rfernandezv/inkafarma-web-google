import { Employee } from "./employee";

export class Response {
    httpStatus: string;
    message: string;
    content: Employee;
    errors: Error[];
}

export class Error {
    message : string;
    cause : string;
}
