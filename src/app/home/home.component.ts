import { Component, OnInit } from '@angular/core';

import { PortfolioService } from '../_services/portfolio.service';
import { AssetsData, Portfolio } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TransacoesAddComponent } from '../transacoes/transacoes-add.component';
import { PricesService } from '../_services/prices.service';
import { concatMap, first } from 'rxjs/operators';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  loading = false;
  portfolio?: Portfolio[];
  modalRef: BsModalRef | undefined;
  prices?: AssetsData[];
  vlrAporte?: number = 0;
  vlrSaldo?: number = 0;

  constructor(
    private portfolioService: PortfolioService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService,
    private pricesService: PricesService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.pricesService.getAll().pipe(
      first(),
      concatMap((prices) => {
        this.prices = prices;
        return this.portfolioService.getAll();
      }),
      first()
    ).subscribe((portfolio) => {
      this.loading = false;
      this.portfolio = portfolio;
      this.portfolio.forEach((item) => {
        if (item.ativoCripto && item.ativoCripto.assetID) {
          const precoAtual = this.getPriceById(item.ativoCripto.assetID);
          item.precoAtual = precoAtual;
        }
      });
      this.calcularTotais();
    });
  }
  abrirTransacoes(ativoId: number) {
    this.router.navigate(['/transacoes', ativoId]);
  }
  modalAddTransacao() {
    this.modalRef = this.modalService.show(TransacoesAddComponent);
  }
  getPriceById(id: number): number {
    const ativo = this.prices?.find(a => a.id === id);
    return ativo ? ativo.quote.usd.price : 0;
  }
  calcularTotais() {
    // Soma os valores de vlrAporte e vlrSaldo de todos os itens do portfólio
    this.vlrAporte = this.portfolio!.reduce((total, item) => total + (item.custoTotal || 0), 0);
    this.vlrSaldo = this.portfolio!.reduce((total, item) => total + (item.precoAtual! * item.quantidadeTotal! || 0), 0);
  }
}
