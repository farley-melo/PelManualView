import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoCalcularPartidaService {
  rfAtual = 0;
  fatorAcucarAtual = 0;
  quantidadeDeTentativas = 0;

  quantidadeAgua = 0;
  totalGorduraAgua = 0;
  totalSnfAgua = 0;

  quantidadePreIntegral = 0;
  totalGorduraPreIntegral = 0;
  totalSnfPreIntegral = 0;

  quantidadePreDesnatado = 0;
  totalGorduraPreDesnatado = 0;
  totalSnfPreDesnatado = 0;

  quantidadeButterOil = 0;
  totalGorduraButterOil = 0;
  totalSnfButterOil = 0;

  totalSnf = 0;
  totalGordura = 0;

  totalPartida = 0;

  tfAtual = 100;

  public autoCalcularLight(acucar: number,
                           esperadoGordura: number,
                           esperadoSnf: number,
                           tfEsperado: number,
                           fatorAcucarMinimo: number,
                           fatorAcucarMaximo: number,
                           rfMinimo: number,
                           rfMaximo: number,
                           gorduraPreDesnatado: number,
                           snfPreDesnatado: number,
                           gorduraAgua: number,
                           snfAgua: number,
                           gorduraButterOil: number, snfButterOil: number) {

    let fatorAcucarRange = this.definirRange(fatorAcucarMinimo, fatorAcucarMaximo);
    let rfRange = this.definirRange(rfMinimo, rfMaximo);

    this.correcoesIniciais(tfEsperado, snfAgua, gorduraAgua, acucar, esperadoSnf, snfPreDesnatado, gorduraPreDesnatado);

    while (!(fatorAcucarRange.includes(this.fatorAcucarAtual) && rfRange.includes(this.rfAtual) && this.tfAtual == tfEsperado)) {
      this.quantidadeDeTentativas += 1;
      if (this.quantidadeDeTentativas > 1000) {
        alert('nao foi possivel calcular tente ajustar manualmente ou acrescente outra materia prima');
        this.resetarValores()
        break;
      }
      this.corrigirTf(tfEsperado, snfAgua, gorduraAgua, acucar);
      this.corrigirSnf(esperadoSnf, snfPreDesnatado, gorduraPreDesnatado, acucar);
      this.corrigirGordura(esperadoGordura, snfPreDesnatado, gorduraPreDesnatado, acucar, snfButterOil, gorduraButterOil);
    }

    console.log('tfAtual:' + this.tfAtual);
    console.log('rfAtual' + this.rfAtual);
    console.log('fatorAcucarAtual:' + this.fatorAcucarAtual);
    console.log('quantidade agua:' + this.quantidadeAgua);
    console.log('quantidade desnatado:' + this.quantidadePreDesnatado);
    console.log('quantidade butter oil:' + this.quantidadeButterOil);
    return {quantidadeAgua:this.quantidadeAgua,quantidadePreDesnatado:this.quantidadePreDesnatado,quantidadeButterOil:this.quantidadeButterOil}
  }

  private correcoesIniciais(tfEsperado: number, snfAgua: number, gorduraAgua: number, acucar: number, esperadoSnf: number, snfPreDesnatado: number, gorduraPreDesnatado: number) {
    while (this.tfAtual > tfEsperado) {
      this.acrescentarMateriaPrima('agua', snfAgua, gorduraAgua, acucar);
    }
    while (this.totalSnf < esperadoSnf) {
      this.acrescentarMateriaPrima('preDesnatado', snfPreDesnatado, gorduraPreDesnatado, acucar);
    }
  }

  private corrigirGordura(esperadoGordura: number, snfPreDesnatado: number, gorduraPreDesnatado: number, acucar: number, snfButterOil: number, gorduraButterOil: number) {
    while (this.totalGordura < esperadoGordura) {
      this.acrescentarMateriaPrima('butterOil', snfPreDesnatado, gorduraPreDesnatado, acucar);
    }
    while (this.totalGordura > esperadoGordura && this.quantidadeButterOil > 0) {
      this.retirarMateriaPrima('butterOil', snfButterOil, gorduraButterOil, acucar);
    }
  }

  private corrigirSnf(esperadoSnf: number, snfPreDesnatado: number, gorduraPreDesnatado: number, acucar: number) {
    while (this.totalSnf < esperadoSnf) {
      this.acrescentarMateriaPrima('preDesnatado', snfPreDesnatado, gorduraPreDesnatado, acucar);
    }
    while (this.totalSnf > esperadoSnf && this.quantidadePreDesnatado > 0) {
      this.retirarMateriaPrima('preDesnatado', snfPreDesnatado, gorduraPreDesnatado, acucar);
    }
  }

  private corrigirTf(tfEsperado: number, snfAgua: number, gorduraAgua: number, acucar: number) {
    while (this.tfAtual > tfEsperado) {
      this.acrescentarMateriaPrima('agua', snfAgua, gorduraAgua, acucar);
    }
    while (this.tfAtual < tfEsperado && this.quantidadeAgua > 0) {
      this.retirarMateriaPrima('agua', snfAgua, gorduraAgua, acucar);
    }
  }

  private acrescentarMateriaPrima(nome: string, analiseSnf: number, analiseGordura: number, acucar: number) {
    if (nome == 'agua') {
      this.quantidadeAgua += 1;
      this.totalSnfAgua = this.calcularSnf(analiseSnf, this.quantidadeAgua);
      this.totalGorduraAgua = this.calcularGordura(analiseGordura, this.quantidadeAgua);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar, this.totalGordura));
    }
    if (nome == 'preDesnatado') {
      this.quantidadePreDesnatado+=1;
      this.totalSnfPreDesnatado = this.calcularSnf(analiseSnf, this.quantidadePreDesnatado);
      this.totalGorduraPreDesnatado = this.calcularGordura(analiseGordura, this.quantidadePreDesnatado);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar, this.totalGordura));
    }
    if (nome == 'preIntegral') {
      this.quantidadePreIntegral += 1;
      this.totalSnfPreIntegral = this.calcularSnf(analiseSnf, this.quantidadePreIntegral);
      this.totalGorduraPreIntegral = this.calcularGordura(analiseGordura, this.quantidadePreIntegral);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar, this.totalGordura));
    }
    if (nome == 'butterOil') {
      this.quantidadeButterOil += 1;
      this.totalSnfButterOil = this.calcularSnf(analiseSnf, this.quantidadeButterOil);
      this.totalGorduraButterOil = this.calcularGordura(analiseGordura, this.quantidadeButterOil);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar, this.totalGordura));
    }
  }

  private retirarMateriaPrima(nome: string, analiseSnf: number, analiseGordura: number, acucar: number) {
    if (nome == 'agua') {
      this.quantidadeAgua -= 1;
      this.totalSnfAgua = this.calcularSnf(analiseSnf, this.quantidadeAgua,);
      this.totalGorduraAgua = this.calcularGordura(analiseGordura, this.quantidadeAgua);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar, this.totalGordura));
    }
    if (nome == 'preDesnatado') {
      this.quantidadePreDesnatado -=1;
      this.totalSnfPreDesnatado = this.calcularSnf(analiseSnf, this.quantidadePreDesnatado);
      this.totalGorduraPreDesnatado = this.calcularGordura(analiseGordura, this.quantidadePreDesnatado);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar, this.totalGordura));
    }
    if (nome == 'preIntegral') {
      this.quantidadePreIntegral -= 1;
      this.totalSnfPreIntegral = this.calcularSnf(analiseSnf, this.quantidadePreIntegral);
      this.totalGorduraPreIntegral = this.calcularGordura(analiseGordura, this.quantidadePreIntegral);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar, this.totalGordura));
    }
    if (nome == 'butterOil') {
      this.quantidadeButterOil -= 1;
      this.totalSnfButterOil = this.calcularSnf(analiseSnf, this.quantidadeButterOil);
      this.totalGorduraButterOil = this.calcularGordura(analiseGordura, this.quantidadeButterOil);
      this.totalGordura = this.totalGorduraAgua + this.totalGorduraPreIntegral + this.totalGorduraPreDesnatado + this.totalGorduraButterOil;
      this.totalSnf = this.totalSnfAgua + this.totalSnfPreIntegral + this.totalSnfPreDesnatado + this.totalSnfButterOil;
      this.totalPartida = this.quantidadeAgua + this.quantidadePreIntegral + this.quantidadePreDesnatado + this.quantidadeButterOil;
      this.tfAtual = parseFloat(this.calcularTf(this.totalGordura, this.totalSnf, acucar, this.totalPartida));
      this.rfAtual = parseFloat(this.calcularRf(this.totalGordura, this.totalSnf));
      this.fatorAcucarAtual = parseFloat(this.calcularFatorAcucar(acucar, this.totalGordura));
    }

  }

  public definirRange(minimo: number, maximo: number): number[] {
    let range = [];
    for (let x = 0; minimo <= maximo; x++) {
      range.push(parseFloat(minimo.toFixed(3)));
      parseFloat((minimo += 0.001).toFixed(3));

    }
    range.push(maximo);
    return range;
  }

  private calcularTf(gorduraTotal: number, snfTotal: number, acucarTotal: number, partidaTotal: number) {
    let totalGordura = gorduraTotal;

    let totalSnf = snfTotal;

    let acucar = acucarTotal;

    let totalPartida = partidaTotal;
    let variavel1 = (totalGordura + totalSnf + acucar);
    let variavel2 = (totalPartida + acucar);
    let tf: number = (variavel1 / variavel2) * 100;
    return tf.toFixed(2);
  }

  private calcularGordura(gorduraAnalise: number, quantidade: number) {
    return (quantidade * gorduraAnalise) / 100;
  }

  private calcularSnf(snfAnalise: number, quantidade: number) {
    return (quantidade * snfAnalise) / 100;
  }

  private calcularFatorAcucar(acucar: number, totalGordura: number) {
    return (acucar / totalGordura).toFixed(2);

  }

  private calcularRf(totalGordura: number, totalSnf: number) {
    return (totalGordura / totalSnf).toFixed(3);
  }

  private resetarValores(){
    this.rfAtual = 0;
    this.fatorAcucarAtual = 0;
    this.quantidadeDeTentativas = 0;

    this. quantidadeAgua = 0;
    this.totalGorduraAgua = 0;
    this.totalSnfAgua = 0;

    this.quantidadePreIntegral = 0;
    this.totalGorduraPreIntegral = 0;
    this.totalSnfPreIntegral = 0;

    this.quantidadePreDesnatado = 0;
    this.totalGorduraPreDesnatado = 0;
    this.totalSnfPreDesnatado = 0;

    this.quantidadeButterOil = 0;
    this.totalGorduraButterOil = 0;
    this.totalSnfButterOil = 0;

    this.totalSnf = 0;
    this.totalGordura = 0;

    this.totalPartida = 0;

    this.tfAtual = 100;
  }


}
