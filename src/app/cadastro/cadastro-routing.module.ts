import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CadastroEstoqueMateriasPrimasComponent} from './cadastro-estoque-materias-primas/cadastro-estoque-materias-primas.component';

const routes: Routes = [
  {path:'',component:CadastroEstoqueMateriasPrimasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
