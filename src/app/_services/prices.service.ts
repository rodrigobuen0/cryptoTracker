import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { AssetsData } from '../_models';

@Injectable({ providedIn: 'root' })
export class PricesService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<AssetsData[]>(`${environment.apiUrl}/Precos`);
    }
    getPrecosPesquisa(asset: string) {
        return this.http.get<AssetsData[]>(`${environment.apiUrl}/Precos/${asset}`);
    }
}