import { Component, OnInit } from '@angular/core';
import { TransacoesService } from '../_services/transacoes.service';
import { Transacao } from '../_models';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-transacoes',
  templateUrl: './transacoes-add.component.html',
  styleUrl: './transacoes-add.component.css',
})
export class TransacoesAddComponent implements OnInit {
  transacoesForm!: FormGroup;

  constructor(
    private transacoesService: TransacoesService,
    private route: ActivatedRoute,
    private bsModalRef: BsModalRef,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {}
  createForm() {
    this.transacoesForm = this.formBuilder.group({
      moeda: [''],
      precoMoeda: [''],
      dataAporte: [''],
      valorAportado: [''],
      TaxaCorretora: [''],
      QtdMoedas: [''],
    });
  }
  onSubmit() {
    console.log('Your form data : ', this.transacoesForm.value);
  }
}
