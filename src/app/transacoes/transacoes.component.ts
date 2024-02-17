import { Component, OnInit } from '@angular/core';
import { TransacoesService } from '../_services/transacoes.service';
import { Transacao } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TransacoesAddVendaComponent } from './transacoes-add-venda.component';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes.component.html',
  styleUrl: './transacoes.component.css'
})
export class TransacoesComponent implements OnInit {
  loading = false;
  transacoes?: Transacao[];
  assetId: string;
  constructor(private transacoesService: TransacoesService, private route: ActivatedRoute, private modalService: BsModalService) {    
    this.assetId = this.route.snapshot.paramMap.get('id') || "";
  }

  ngOnInit() {
      this.loading = true;
      this.transacoesService.getAllAsset(this.assetId).pipe().subscribe(transacao => {
          this.loading = false;
          this.transacoes = transacao;
      });
  }
  openVendaModal(): void {
    const initialState = {
      assetId: this.assetId
    };
    this.modalService.show(TransacoesAddVendaComponent, { initialState });
  }
}
