import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacoesAddComponent } from './transacoes-add.component';

describe('TransacoesComponent', () => {
  let component: TransacoesAddComponent;
  let fixture: ComponentFixture<TransacoesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransacoesAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransacoesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
