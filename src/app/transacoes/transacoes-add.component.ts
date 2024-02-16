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
  today = new Date().toISOString().substr(0, 10);

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
      idMoeda: [null],
      moeda: [''],
      precoMoeda: [''],
      dataAporte: [this.today],
      valorAportado: [''],
      TaxaCorretora: [''],
      QtdMoedas: [''],
    });
  }

  searchMoedas(event: Event) {
    const keyword = (event.target as HTMLInputElement)?.value;
    if (keyword !== undefined) {
      if (keyword.trim() === '') {
        this.moedas = [];
        return;
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
    this.moedas = [];
    this.transacoesForm.patchValue({
      precoMoeda: this.formatarPreco(moeda.price),
      idMoeda: moeda.id
    });
    this.transacoesForm.patchValue({ QtdMoedas: null, valorAportado: null, TaxaCorretora: null, dataAporte: this.today});

  }

  formatarPreco(price: number): string {
    const precoFormatado = price.toFixed(10);
    const partesPreco = precoFormatado.split('.');
    const parteDecimal = partesPreco[1];

    if (parteDecimal && parteDecimal.length > 4 && parteDecimal.slice(0, 4) !== '0000') {
      return `${partesPreco[0]}.${parteDecimal.slice(0, 4)}`;
    } else {
      return parseFloat(precoFormatado).toFixed(10);
    }
  }

  calcularQuantidadeMoedas() {
    const valorAportado = parseFloat(this.transacoesForm.get('valorAportado')?.value);
    const precoMoeda = parseFloat(this.transacoesForm.get('precoMoeda')?.value);
  
    if (!isNaN(valorAportado) && !isNaN(precoMoeda) && precoMoeda !== 0) {
      const quantidadeMoedas = valorAportado / precoMoeda;
      this.transacoesForm.patchValue({ QtdMoedas: quantidadeMoedas.toFixed(10) });
    }else{
      this.transacoesForm.patchValue({ QtdMoedas: null});
    }
  }
  
  calcularValorAportado() {
    const quantidadeMoedas = parseFloat(this.transacoesForm.get('QtdMoedas')?.value);
    const precoMoeda = parseFloat(this.transacoesForm.get('precoMoeda')?.value);
  
    if (!isNaN(quantidadeMoedas) && !isNaN(precoMoeda) && quantidadeMoedas !== 0) {
      const valorAportado = quantidadeMoedas * precoMoeda;
      this.transacoesForm.patchValue({ valorAportado: valorAportado.toFixed(10) });
    }else{
      this.transacoesForm.patchValue({ valorAportado: null});
    }
  }
  onSubmit() {
    console.log('Your form data : ', this.transacoesForm.value);
  }
}
