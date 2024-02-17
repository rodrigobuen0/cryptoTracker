import { Component, Input, OnInit } from '@angular/core';
import { TransacoesService } from '../_services/transacoes.service';
import { AssetsData, TipoTransacao, Transacao, TransacaoDto } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PricesService } from '../_services/prices.service';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes-add-venda.component.html',
  styleUrl: './transacoes-add-venda.component.css',
})
export class TransacoesAddVendaComponent implements OnInit {
  @Input() assetId!: string;
  transacoesForm!: FormGroup;
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
      idMoeda: [this.assetId],
      moeda: [''],
      precoMoeda: [''],
      dataAporte: [this.today],
      valorAportado: [''],
      TaxaCorretora: [''],
      QtdMoedas: [''],
    });

    this.pricesService.getPrecoAsset(parseInt(this.assetId)).subscribe(response => {
      this.transacoesForm.patchValue({
        idMoeda: response.id,
        moeda: response.name,
        precoMoeda: this.formatarPreco(response.quote.usd.price),
      });
    });
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
    if(!this.transacoesForm.value.TaxaCorretora){
      this.transacoesForm.value.TaxaCorretora = 0;
    }
    const transacaoData: TransacaoDto = {
      transactionID: 0, // Deixe como 0 para ser preenchido pelo servidor
      portfolioID: 0, // Deixe como 0 para ser preenchido pelo servidor
      assetID: this.transacoesForm.value.idMoeda,
      tipo: TipoTransacao.Venda, // Ou defina o tipo de transação apropriado
      quantidade: parseFloat(this.transacoesForm.value.QtdMoedas),
      precoPorUnidade: parseFloat(this.transacoesForm.value.precoMoeda),
      custo: parseFloat(this.transacoesForm.value.valorAportado),
      taxa: 0,
      dataTransacao: new Date(this.transacoesForm.value.dataAporte)
    };

    // Envie o objeto Transacoes para o serviço
    this.transacoesService.addTransacaoVenda(transacaoData)
      .subscribe(
        response => {
          // Lógica após a resposta bem-sucedida
          console.log('Transação adicionada com sucesso:', response);
          this.bsModalRef.hide();
        },
        error => {
          // Lógica para lidar com erros
          console.error('Erro ao adicionar transação:', error);
        }
      );
  }
}
