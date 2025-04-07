import { Injectable } from "@angular/core";
import { CrudService } from "./crud.service";
import { InventoryHistory } from "../../models/inventory";

@Injectable({
    providedIn: 'root',
})
export class InventoryService extends CrudService<InventoryHistory> {
    constructor(){
        super('/v1/inventory')
    }
}