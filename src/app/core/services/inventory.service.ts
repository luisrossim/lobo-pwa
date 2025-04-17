import { inject, Injectable } from "@angular/core";
import { CrudService } from "./crud.service";
import { NovaContagemEstoque, ContagemEstoque } from "../../models/inventory";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { UtilitiesService } from "../../utils/services/utilities.service";

@Injectable({
    providedIn: 'root',
})
export class InventoryService extends CrudService<ContagemEstoque> {
    private utilitiesService = inject(UtilitiesService);

    constructor(){
        super('/inventory')
    }
    
    private countIsCompletedSubject = new BehaviorSubject<boolean>(false);
    public countIsCompleted$ = this.countIsCompletedSubject.asObservable();

    public getCountIsCompletedValue(){
        return this.countIsCompletedSubject.getValue();
    }

    public fetchHistoryAndCheckToday(): Observable<ContagemEstoque[]> {
        return this.getAll().pipe(
            tap(list => {
                const uniqueDates = this.utilitiesService.getUniqueDatesFromArray(list);
                const hasToday = this.utilitiesService.hasTodayRecord(uniqueDates);
                this.countIsCompletedSubject.next(hasToday);
            })
        );
    }

    public createHistorico(resource: NovaContagemEstoque[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}`, resource);
    }
}