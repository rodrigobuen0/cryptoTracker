import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PortfolioService } from '../_services/portfolio.service';
import { Portfolio } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TransacoesAddComponent } from '../transacoes/transacoes-add.component';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  loading = false;
  portfolio?: Portfolio[];
  modalRef: BsModalRef | undefined;

  constructor(
    private porfolioService: PortfolioService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.porfolioService
      .getAll()
      .pipe(first())
      .subscribe((portfolio) => {
        this.loading = false;
        this.portfolio = portfolio;
      });
  }
  abrirTransacoes(ativoId: number) {
    this.router.navigate(['/transacoes', ativoId]);
  }
  modalAddTransacao() {
    this.modalRef = this.modalService.show(TransacoesAddComponent);
  }
}
