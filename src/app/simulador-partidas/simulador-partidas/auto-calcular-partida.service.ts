import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoCalcularPartidaService {

  constructor() { }
  public autoCalcular() {

    let acucar = 7500;

    let esperadoGordura = 1363.64;
    let esperadoSnf = 3383.72;

    let quantidadeLeite = 0;
    let totalGorduraLeite = this.calcularGordura(3.57, quantidadeLeite);
    let totalSnfLeite = this.calcularSnf(8.74, quantidadeLeite);

    let quantiddaePreIntegral = 0;
    let totalGorduraPreIntegral = this.calcularGordura(11, quantiddaePreIntegral);
    let totalSnfPreIntegral = this.calcularSnf(31.25, quantiddaePreIntegral);

    let quantidadePreDesnatado = 0;
    let totalGorduraPreDesnatado = this.calcularGordura(0.17, quantidadePreDesnatado);
    let totalSnfPreDesnatado = this.calcularSnf(33.7, quantidadePreDesnatado);

    let quantidadeButterOil = 0;
    let totalGorduraButterOil = this.calcularGordura(99.92, quantidadeButterOil);
    let totalSnfButterOil = 0;

    let totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
    let totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;

    let totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;

    let tfEsperado = 44.20;
    let tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
    //1 acrescentar leite ate ajustar o snf objetivo
    while (tfAtual > tfEsperado) {
      quantidadeLeite++;
      totalGorduraLeite = this.calcularGordura(3.57, quantidadeLeite);
      totalSnfLeite = this.calcularSnf(8.74, quantidadeLeite);
      totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
      totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
      totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
      tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));

    }
    console.log('passo 1');
    console.log('total partida:' + totalPartida);
    console.log('tf atual :' + tfAtual);
    console.log('tf esperado :' + tfEsperado);
    console.log('total gordura :' + totalGordura);
    console.log('total snf :' + totalSnf);
    console.log('snf esperado:' + esperadoSnf);
    console.log('gordura esperada :' + esperadoGordura);
    console.log('--------------------------');

    //Acrescente pre integral ate atingir o snf objetivo
    while (esperadoSnf > totalSnf) {
      quantiddaePreIntegral++;
      totalGorduraPreIntegral = this.calcularGordura(11, quantiddaePreIntegral);
      totalSnfPreIntegral = this.calcularSnf(31.25, quantiddaePreIntegral);
      totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
      totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
      totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
      tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
    }
    console.log('passo 2');
    console.log('total partida:' + totalPartida);
    console.log('tf atual :' + tfAtual);
    console.log('tf esperado :' + tfEsperado);
    console.log('total gordura :' + totalGordura);
    console.log('total snf :' + totalSnf);
    console.log('snf esperado:' + esperadoSnf);
    console.log('gordura esperada :' + esperadoGordura);
    console.log('--------------------------');

    while ((Math.trunc(totalSnf) != Math.trunc(esperadoSnf)) || (Math.trunc(totalGordura) != Math.trunc(esperadoGordura)) || (tfEsperado != tfAtual)) {
      while (tfAtual > tfEsperado) {
        quantidadeLeite++;
        totalGorduraLeite = this.calcularGordura(3.57, quantidadeLeite);
        totalSnfLeite = this.calcularSnf(8.74, quantidadeLeite);
        totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
        totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
        totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
        tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
      }
      console.log('passo 3i');
      console.log('total partida:' + totalPartida);
      console.log('tf atual :' + tfAtual);
      console.log('tf esperado :' + tfEsperado);
      console.log('total gordura :' + totalGordura);
      console.log('total snf :' + totalSnf);
      console.log('snf esperado:' + esperadoSnf);
      console.log('gordura esperada :' + esperadoGordura);
      console.log('--------------------------');

      while (tfAtual < tfEsperado) {
        quantidadeLeite--;
        totalGorduraLeite = this.calcularGordura(3.57, quantidadeLeite);
        totalSnfLeite = this.calcularSnf(8.74, quantidadeLeite);
        totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
        totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
        totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
        tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
      }
      console.log('passo 3j');
      console.log('total partida:' + totalPartida);
      console.log('tf atual :' + tfAtual);
      console.log('tf esperado :' + tfEsperado);
      console.log('total gordura :' + totalGordura);
      console.log('total snf :' + totalSnf);
      console.log('snf esperado:' + esperadoSnf);
      console.log('gordura esperada :' + esperadoGordura);
      console.log('--------------------------');

      //loop auto ajuste
      //se o snf e a gordura estiverem abaixo do desejado aumentar  o pre integral ate o total de snf atingir o desejado de snf
      if (totalSnf < esperadoSnf && totalGordura < esperadoGordura) {
        while (totalSnf < esperadoSnf) {
          quantiddaePreIntegral++;
          totalGorduraPreIntegral = this.calcularGordura(11, quantiddaePreIntegral);
          totalSnfPreIntegral = this.calcularSnf(31.25, quantiddaePreIntegral);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
        }
        console.log('passo 3a');
        console.log('total partida:' + totalPartida);
        console.log('tf atual :' + tfAtual);
        console.log('tf esperado :' + tfEsperado);
        console.log('total gordura :' + totalGordura);
        console.log('total snf :' + totalSnf);
        console.log('snf esperado:' + esperadoSnf);
        console.log('gordura esperada :' + esperadoGordura);
        console.log('--------------------------');

      }
      //se somente o  snf estiver abaixo do desejado aumentar o pre desnatado ate o snf atingir o desejado
      if (totalSnf < esperadoSnf) {
        while (totalSnf < esperadoSnf) {
          quantidadePreDesnatado++;
          totalGorduraPreDesnatado = this.calcularGordura(0.17, quantidadePreDesnatado);
          totalSnfPreDesnatado = this.calcularSnf(33.70, quantidadePreDesnatado);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
        }
        console.log('passo 3b');
        console.log('total partida:' + totalPartida);
        console.log('tf atual :' + tfAtual);
        console.log('tf esperado :' + tfEsperado);
        console.log('total gordura :' + totalGordura);
        console.log('total snf :' + totalSnf);
        console.log('snf esperado:' + esperadoSnf);
        console.log('gordura esperada :' + esperadoGordura);
        console.log('--------------------------');
      }
      //se somente a gordura estiver abaixo do desejado acrescentar butter oil ate a gordura atingir o desejado
      if (totalGordura < esperadoGordura) {
        while (totalGordura < esperadoGordura) {
          quantidadeButterOil++;
          totalGorduraButterOil = this.calcularGordura(99.92, quantidadeButterOil);
          totalSnfButterOil = 0;
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
        }
        console.log('passo 3c');
        console.log('total partida:' + totalPartida);
        console.log('tf atual :' + tfAtual);
        console.log('tf esperado :' + tfEsperado);
        console.log('total gordura :' + totalGordura);
        console.log('total snf :' + totalSnf);
        console.log('snf esperado:' + esperadoSnf);
        console.log('gordura esperada :' + esperadoGordura);
        console.log('--------------------------');
      }
      ///////caso as materias primas estiverem altas

      //se a gordura estiver mais alta que o desejado e estiver usando butter oil retirar butter oil ate a gordura atingir o desejado
      if (totalGordura > esperadoGordura && quantidadeButterOil > 0) {
        while (totalGordura > esperadoGordura) {
          quantidadeButterOil--;
          totalGorduraButterOil = this.calcularGordura(99.92, quantidadeButterOil);
          totalSnfButterOil = 0;
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
        }
        console.log('passo 3d');
        console.log('total partida:' + totalPartida);
        console.log('tf atual :' + tfAtual);
        console.log('tf esperado :' + tfEsperado);
        console.log('total gordura :' + totalGordura);
        console.log('total snf :' + totalSnf);
        console.log('snf esperado:' + esperadoSnf);
        console.log('gordura esperada :' + esperadoGordura);
        console.log('--------------------------');
      }
      //se o snf estiver mais alto que o snf desejado e estiver usando pre desnatado retirar o pre desnatado ate o snf atingir o desejado
      if (totalSnf > esperadoSnf && quantidadePreDesnatado > 0) {
        while (totalSnf > esperadoSnf) {
          quantidadePreDesnatado--;
          totalGorduraPreDesnatado = this.calcularGordura(0.17, quantidadePreDesnatado);
          totalSnfPreDesnatado = this.calcularSnf(33.70, quantidadePreDesnatado);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
        }
        console.log('passo 3e');
        console.log('total partida:' + totalPartida);
        console.log('tf atual :' + tfAtual);
        console.log('tf esperado :' + tfEsperado);
        console.log('total gordura :' + totalGordura);
        console.log('total snf :' + totalSnf);
        console.log('snf esperado:' + esperadoSnf);
        console.log('gordura esperada :' + esperadoGordura);
        console.log('--------------------------');
      }
      //se o a gordura e o snf estiverem altos retirar pre integral ate atingir o snf objetivo
      if (totalGordura > esperadoGordura && totalSnf > esperadoSnf) {
        while (totalSnf > esperadoSnf) {
          quantiddaePreIntegral--;
          totalGorduraPreIntegral = this.calcularGordura(11, quantiddaePreIntegral);
          totalSnfPreIntegral = this.calcularSnf(31.25, quantiddaePreIntegral);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
        }
        console.log('passo 3f');
        console.log('total partida:' + totalPartida);
        console.log('tf atual :' + tfAtual);
        console.log('tf esperado :' + tfEsperado);
        console.log('total gordura :' + totalGordura);
        console.log('total snf :' + totalSnf);
        console.log('snf esperado:' + esperadoSnf);
        console.log('gordura esperada :' + esperadoGordura);
        console.log('--------------------------');
      }
      //se o snf estiver alto e nao estiver usando pre desnatado retirar pre integral ate snf atingir o objetivo
      if (totalSnf > esperadoSnf && quantidadePreDesnatado == 0) {
        while (totalSnf > esperadoSnf) {
          quantiddaePreIntegral--;
          totalGorduraPreIntegral = this.calcularGordura(11, quantiddaePreIntegral);
          totalSnfPreIntegral = this.calcularSnf(31.25, quantiddaePreIntegral);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
        }
        console.log('passo 3g');
        console.log('total partida:' + totalPartida);
        console.log('tf atual :' + tfAtual);
        console.log('tf esperado :' + tfEsperado);
        console.log('total gordura :' + totalGordura);
        console.log('total snf :' + totalSnf);
        console.log('snf esperado:' + esperadoSnf);
        console.log('gordura esperada :' + esperadoGordura);
        console.log('--------------------------');
      }
      if (totalGordura > esperadoGordura && quantidadeButterOil == 0) {
        while (totalGordura > esperadoGordura) {
          quantiddaePreIntegral--;
          totalGorduraPreIntegral = this.calcularGordura(11, quantiddaePreIntegral);
          totalSnfPreIntegral = this.calcularSnf(31.25, quantiddaePreIntegral);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
        }
        console.log('passo 3h');
        console.log('total partida:' + totalPartida);
        console.log('tf atual :' + tfAtual);
        console.log('tf esperado :' + tfEsperado);
        console.log('total gordura :' + totalGordura);
        console.log('total snf :' + totalSnf);
        console.log('snf esperado:' + esperadoSnf);
        console.log('gordura esperada :' + esperadoGordura);
        console.log('--------------------------');
      }
    }
    console.log('Resultado final');
    console.log('total partida:' + totalPartida);
    console.log('tf atual :' + tfAtual);
    console.log('tf esperado :' + tfEsperado);
    console.log('total gordura :' + totalGordura);
    console.log('total snf :' + totalSnf);
    console.log('snf esperado:' + esperadoSnf);
    console.log('quantidade leite:' + quantidadeLeite);
    console.log('quantidade pre integral :' + quantiddaePreIntegral);
    console.log('quantidade desnatado:' + quantidadePreDesnatado);
    console.log('quantidade butter oil :' +quantidadeButterOil);
    console.log('--------------------------');
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
}
