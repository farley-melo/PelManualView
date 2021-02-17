import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MateriaPrimaService {

  constructor() { }

  public carregarListaDemateriasPrimas():string[]{
    return ['pre condensado','leite integral','butter oil']
  }
}
