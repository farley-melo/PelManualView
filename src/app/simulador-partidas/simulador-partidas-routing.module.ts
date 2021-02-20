import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SimuladorPartidasComponent} from './simulador-partidas/simulador-partidas.component';


const routes: Routes = [
  {path:'',component:SimuladorPartidasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimuladorPartidasRoutingModule { }
