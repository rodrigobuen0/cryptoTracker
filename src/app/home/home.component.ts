import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PortfolioService } from '../_services/portfolio.service';
import { Portfolio } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit{
    loading = false;
    portfolio?: Portfolio[];

    constructor(private porfolioService: PortfolioService, private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        this.loading = true;
        this.porfolioService.getAll().pipe(first()).subscribe(portfolio => {
            this.loading = false;
            this.portfolio = portfolio;
        });
    }
    abrirTransacoes(ativoId: number) {
        this.router.navigate(['/transacoes', ativoId]);
      }
}