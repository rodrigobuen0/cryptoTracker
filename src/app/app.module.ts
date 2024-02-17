import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TransacoesComponent } from './transacoes/transacoes.component';
import { TransacoesAddComponent } from './transacoes/transacoes-add.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import  {  FormsModule,  ReactiveFormsModule  }  from  '@angular/forms';
import { NumbersOnlyDirective } from './_helpers/numbers-only.directive'; // Importe a diretiva aqui
import { TransacoesAddVendaComponent } from './transacoes/transacoes-add-venda.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        TransacoesComponent,
        TransacoesAddComponent,
        TransacoesAddVendaComponent,
        NumbersOnlyDirective
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        BsModalService

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }