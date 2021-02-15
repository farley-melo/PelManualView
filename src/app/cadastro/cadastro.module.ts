import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroEstoqueMateriasPrimasComponent } from './cadastro-estoque-materias-primas/cadastro-estoque-materias-primas.component';


@NgModule({
  declarations: [CadastroEstoqueMateriasPrimasComponent],
  imports: [
    CommonModule,
    CadastroRoutingModule
  ]
})
export class CadastroModule { }
