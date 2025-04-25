import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthRequest } from "../../models/auth";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  protected readonly http = inject(HttpClient)
  protected readonly apiUrl: string

  constructor(){
    this.apiUrl = `${environment.baseUrl}/auth`;
  }

  public login(resource: AuthRequest): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/login`, resource);
  }

  public logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {});
  }
}