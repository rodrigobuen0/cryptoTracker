import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacoesAddVendaComponent } from './transacoes-add-venda.component';

describe('TransacoesComponent', () => {
  let component: TransacoesAddVendaComponent;
  let fixture: ComponentFixture<TransacoesAddVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransacoesAddVendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransacoesAddVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
