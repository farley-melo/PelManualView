import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LancarTlComponent} from './lancar-tl/lancar-tl.component';

const routes: Routes = [
  {path:'',component:LancarTlComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LancarTlRoutingModule { }
