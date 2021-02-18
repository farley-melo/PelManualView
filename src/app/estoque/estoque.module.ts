import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstoqueRoutingModule } from './estoque-routing.module';
import { EstoqueComponent } from './estoque/estoque.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [EstoqueComponent],
    imports: [
        CommonModule,
        EstoqueRoutingModule,
        BsDropdownModule,FormsModule,ReactiveFormsModule
    ]
})
export class EstoqueModule { }
