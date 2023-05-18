import { HttpClient, HttpParams } from "@angular/common/http";
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

    getUsers() {
        return this.GetCall('/api/User/GetAll', null, null, null);
    }

    updateUser(data: any) {
        return this.PutCall('/api/User/Update', data, null, null);
    }

    getUserById(data: any) {
        return this.GetCall('/api/User/GetUserById', data, null, null);
    }

    deleteUser(userId: any) {
        this.params = new HttpParams();
        this.params = this.params.append('id', userId);
        return this.DeleteCall('/api/User/Delete',null, null, this.params, null);
    }
}