import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { Portfolio } from '../_models/portfolio';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Portfolio[]>(`${environment.apiUrl}/portfolio`);
    }
}