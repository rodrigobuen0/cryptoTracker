import { Component, OnInit } from '@angular/core';
import { TransacoesService } from '../_services/transacoes.service';
import { AssetsData, Transacao } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PricesService } from '../_services/prices.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes-add.component.html',
  styleUrl: './transacoes-add.component.css',
})
export class TransacoesAddComponent implements OnInit {
  transacoesForm!: FormGroup;
  moedas: { id: number, name: string, price: number }[] = []; // Array para armazenar os IDs, nomes e preços das moedas

  constructor(
    private transacoesService: TransacoesService,
    private pricesService: PricesService,
    private route: ActivatedRoute,
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.transacoesForm = this.formBuilder.group({
      moeda: [''],
      precoMoeda: [''],
      dataAporte: [''],
      valorAportado: [''],
      TaxaCorretora: [''],
      QtdMoedas: [''],
    });
    
  }

  searchMoedas(event: Event) {
    const keyword = (event.target as HTMLInputElement)?.value;
    if (keyword !== undefined) {
      // Chame sua função de pesquisa com a palavra-chave
      if (keyword.trim() === '') {
        // Se o campo de pesquisa estiver vazio, limpe a lista de moedas
        this.moedas = [];
        return; // Não chame a API
      }
      this.pricesService.getPrecosPesquisa(keyword).subscribe(response => {
        this.moedas = response.map((asset: AssetsData) => ({
          id: asset.id,
          name: asset.name,
          price: asset.quote.usd.price
        }));
      });
    }
  }
  
  selectMoeda(moeda: { id: number, name: string, price: number }) {
    this.transacoesForm.get('moeda')?.setValue(moeda.name);
    // Você pode fazer mais ações aqui se necessário
    this.moedas = []; // Limpar a lista de moedas após a seleção
    this.transacoesForm.patchValue({
      precoMoeda: moeda.price
    });
  }

  onSubmit() {
    console.log('Your form data : ', this.transacoesForm.value);
  }
}
