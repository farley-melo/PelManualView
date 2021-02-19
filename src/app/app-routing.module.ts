import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'cadastro-estoque-materias-primas',loadChildren:()=>import('./cadastro/cadastro.module').then(m=>m.CadastroModule)},
  {path:'estoque',loadChildren:()=>import('./estoque/estoque.module').then(m=>m.EstoqueModule)},
  {path:'calculos',loadChildren:()=>import('./calculos/calculos.module').then(m=>m.CalculosModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
