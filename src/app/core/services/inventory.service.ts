import { Injectable } from "@angular/core";
import { CrudService } from "./crud.service";
import { CreateHistory, InventoryHistory } from "../../models/inventory";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class InventoryService extends CrudService<InventoryHistory> {
    constructor(){
        super('/v1/inventory')
    }

    public createHistorico(resource: CreateHistory[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}`, resource);
    }
}