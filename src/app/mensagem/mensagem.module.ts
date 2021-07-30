import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MensagemRoutingModule } from './mensagem-routing.module';
import { MensagemComponent } from './mensagem/mensagem.component';


@NgModule({
  declarations: [MensagemComponent],
  imports: [
    CommonModule,
    MensagemRoutingModule
  ]
})
export class MensagemModule { }
