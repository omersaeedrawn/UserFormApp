import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GenericService } from "./generic_base.class";

@Injectable()
export default class UserService extends GenericService {
    constructor(http: HttpClient) {
        super(http);
    }

    createUser(data: any) {
        return this.PostCall('/api/User/Add', data, null, null);
    }

    getUsers(data: any) {
        return this.PostCall('/api/Category/GetAll', data, null, null);
    }
}