import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CadastroEstoqueMateriasPrimasComponent} from './cadastro-estoque-materias-primas/cadastro-estoque-materias-primas.component';
import {CadastroMateriasPrimasComponent} from './cadastro-materias-primas/cadastro-materias-primas.component';
import {CadastroFormulasComponent} from './cadastro-formulas/cadastro-formulas.component';

const routes: Routes = [
  {path:'',component:CadastroEstoqueMateriasPrimasComponent},
  {path:'cadastrar_materias_primas',component:CadastroMateriasPrimasComponent},
  {path:'cadastrar_formulas',component:CadastroFormulasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastroRoutingModule { }
