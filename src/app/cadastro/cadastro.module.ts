import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroEstoqueMateriasPrimasComponent } from './cadastro-estoque-materias-primas/cadastro-estoque-materias-primas.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CadastroEstoqueMateriasPrimasComponent],
  imports: [
    CommonModule,
    CadastroRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class CadastroModule { }
