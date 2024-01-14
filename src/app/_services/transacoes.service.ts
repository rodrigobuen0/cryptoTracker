import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { Transacao } from '../_models/transacoes';

@Injectable({ providedIn: 'root' })
export class TransacoesService {
    constructor(private http: HttpClient) { }

    getAllAsset(assetId: string) {
        return this.http.get<Transacao[]>(`${environment.apiUrl}/transacoes/asset/${assetId}`);
    }
}