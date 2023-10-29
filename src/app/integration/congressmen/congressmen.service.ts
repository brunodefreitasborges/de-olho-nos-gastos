import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map, of } from 'rxjs';
import { Congressman, CongressmanResponse, Congressmen, CongressmenResponse } from './congressmen.model';

@Injectable({
  providedIn: 'root'
})
export class CongressmenService {

  constructor(private _http: HttpClient) {}

  headers = new HttpHeaders(
    {}
  );

  fetchCongressmen(): Observable<Congressmen[]> {
    return this._http.get<CongressmenResponse>('api').pipe(map((response) => response.dados));
  }

  fetchCongressman(id: string): Observable<Congressman> {
    return this._http.get<CongressmanResponse>(`api/${id}`).pipe(map((response) => response.dados));
  }
}
