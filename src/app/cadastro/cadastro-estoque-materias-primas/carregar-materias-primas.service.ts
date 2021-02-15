import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarregarMateriasPrimasService {

  constructor() {
  }

  carregarMateriasPrimas(): string[] {
    return ['creme','leite integral','butter oil','pre condensado','creme','leite','bo','pre','creme','leite','bo','pre']

  }
}
