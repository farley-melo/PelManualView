import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutoCalcularPartidaService {

  public autoCalcular(acucar:number,
                      esperadoGordura:number,
                      esperadoSnf:number,
                      rfEsperado:number,
                      fatorAcucarEsperador:number,
                      tfEsperado:number,
                      gorduraLeiteIntegral:number,
                      snfLeiteIntegral:number,
                      gorduraPreIntegral: number,
                      snfPreIntegral: number,
                      gorduraPreDesnatado:number,
                      snfPreDesnatado:number,
                      gorduraButterOil:number) {
    let rfAtual=0
    let fatorAcucarAtual=0

    let quantidadeLeite = 0;
    let totalGorduraLeite = 0
    let totalSnfLeite = 0

    let quantiddaePreIntegral = 0;
    let totalGorduraPreIntegral = 0
    let totalSnfPreIntegral =0

    let quantidadePreDesnatado = 0;
    let totalGorduraPreDesnatado = 0
    let totalSnfPreDesnatado = 0

    let quantidadeButterOil = 0;
    let totalGorduraButterOil = 0
    let totalSnfButterOil = 0;

    let totalSnf = 0
    let totalGordura = 0

    let totalPartida = 0

    let tfAtual = 0
    //1 acrescentar leite ate ajustar o snf objetivo
    while (tfAtual > tfEsperado) {
      quantidadeLeite++;
      totalGorduraLeite = this.calcularGordura(gorduraLeiteIntegral, quantidadeLeite);
      totalSnfLeite = this.calcularSnf(snfLeiteIntegral, quantidadeLeite);
      totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
      totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
      totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
      tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
      rfAtual=parseFloat(this.calcularRf(acucar,totalSnf))
      fatorAcucarAtual=parseFloat(this.calcularFatorAcucar(acucar,totalGordura))

    }

    //Acrescente pre integral ate atingir o snf objetivo
    while (esperadoSnf > totalSnf) {
      quantiddaePreIntegral++;
      totalGorduraPreIntegral = this.calcularGordura(11, quantiddaePreIntegral);
      totalSnfPreIntegral = this.calcularSnf(31.25, quantiddaePreIntegral);
      totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
      totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
      totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
      tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
      rfAtual=parseFloat(this.calcularRf(acucar,totalSnf))
      fatorAcucarAtual=parseFloat(this.calcularFatorAcucar(acucar,totalGordura))
    }


    while ((rfAtual != rfEsperado) || (tfAtual != tfEsperado)||(fatorAcucarAtual!=fatorAcucarEsperador)) {
      if(tfAtual > tfEsperado) {
        while (tfAtual > tfEsperado) {
          quantidadeLeite++;
          totalGorduraLeite = this.calcularGordura(gorduraLeiteIntegral, quantidadeLeite);
          totalSnfLeite = this.calcularSnf(snfLeiteIntegral, quantidadeLeite);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
          rfAtual=parseFloat(this.calcularRf(totalGordura,totalSnf))
          fatorAcucarAtual=parseFloat(this.calcularFatorAcucar(acucar,totalGordura))
          if(tfAtual==tfEsperado&&rfAtual==rfEsperado&&fatorAcucarAtual==fatorAcucarEsperador){
            return{leite:quantidadeLeite,preIntegral:quantiddaePreIntegral,preDesnatado:quantidadePreDesnatado,butterOil:quantidadeButterOil};
          }
        }
      }
      if(tfAtual < tfEsperado) {
        while (tfAtual < tfEsperado) {
          quantidadeLeite--;
          totalGorduraLeite = this.calcularGordura(gorduraLeiteIntegral, quantidadeLeite);
          totalSnfLeite = this.calcularSnf(snfLeiteIntegral, quantidadeLeite);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
          rfAtual=parseFloat(this.calcularRf(totalGordura,totalSnf))
          fatorAcucarAtual=parseFloat(this.calcularFatorAcucar(acucar,totalGordura))
          if(tfAtual==tfEsperado&&rfAtual==rfEsperado&&fatorAcucarAtual==fatorAcucarEsperador){
            return{leite:quantidadeLeite,preIntegral:quantiddaePreIntegral,preDesnatado:quantidadePreDesnatado,butterOil:quantidadeButterOil};
          }
        }


      }
      //loop auto ajuste
      //se o snf e a gordura estiverem abaixo do desejado aumentar  o pre integral ate o total de snf atingir o desejado de snf
      if (totalSnf < esperadoSnf && totalGordura < esperadoGordura) {
        while (totalSnf < esperadoSnf) {
          quantiddaePreIntegral++;
          totalGorduraPreIntegral = this.calcularGordura(gorduraPreIntegral, quantiddaePreIntegral);
          totalSnfPreIntegral = this.calcularSnf(snfPreIntegral, quantiddaePreIntegral);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
          rfAtual=parseFloat(this.calcularRf(totalGordura,totalSnf))
          fatorAcucarAtual=parseFloat(this.calcularFatorAcucar(acucar,totalGordura))
          if(tfAtual==tfEsperado&&rfAtual==rfEsperado&&fatorAcucarAtual==fatorAcucarEsperador){
            return{leite:quantidadeLeite,preIntegral:quantiddaePreIntegral,preDesnatado:quantidadePreDesnatado,butterOil:quantidadeButterOil};
          }
        }

      }
      //se somente o  snf estiver abaixo do desejado aumentar o pre desnatado ate o snf atingir o desejado
      if (totalSnf < esperadoSnf) {
        while (totalSnf < esperadoSnf) {
          quantidadePreDesnatado++;
          totalGorduraPreDesnatado = this.calcularGordura(gorduraPreDesnatado, quantidadePreDesnatado);
          totalSnfPreDesnatado = this.calcularSnf(snfPreDesnatado, quantidadePreDesnatado);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
          rfAtual=parseFloat(this.calcularRf(totalGordura,totalSnf))
          fatorAcucarAtual=parseFloat(this.calcularFatorAcucar(acucar,totalGordura))
          if(tfAtual==tfEsperado&&rfAtual==rfEsperado&&fatorAcucarAtual==fatorAcucarEsperador){
            return{leite:quantidadeLeite,preIntegral:quantiddaePreIntegral,preDesnatado:quantidadePreDesnatado,butterOil:quantidadeButterOil};
          }
        }

      }
      //se somente a gordura estiver abaixo do desejado acrescentar butter oil ate a gordura atingir o desejado
      if (totalGordura < esperadoGordura) {
        while (totalGordura < esperadoGordura) {
          quantidadeButterOil++;
          totalGorduraButterOil = this.calcularGordura(gorduraButterOil, quantidadeButterOil);
          totalSnfButterOil = 0;
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
          rfAtual=parseFloat(this.calcularRf(totalGordura,totalSnf))
          fatorAcucarAtual=parseFloat(this.calcularFatorAcucar(acucar,totalGordura))
          if(tfAtual==tfEsperado&&rfAtual==rfEsperado&&fatorAcucarAtual==fatorAcucarEsperador){
            return{leite:quantidadeLeite,preIntegral:quantiddaePreIntegral,preDesnatado:quantidadePreDesnatado,butterOil:quantidadeButterOil};
          }
        }

      }
      ///////caso as materias primas estiverem altas

      //se a gordura estiver mais alta que o desejado e estiver usando butter oil retirar butter oil ate a gordura atingir o desejado
      if (totalGordura > esperadoGordura && quantidadeButterOil > 0) {
        while (totalGordura > esperadoGordura) {
          quantidadeButterOil--;
          totalGorduraButterOil = this.calcularGordura(gorduraButterOil, quantidadeButterOil);
          totalSnfButterOil = 0;
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
          rfAtual=parseFloat(this.calcularRf(totalGordura,totalSnf))
          fatorAcucarAtual=parseFloat(this.calcularFatorAcucar(acucar,totalGordura))
          if(tfAtual==tfEsperado&&rfAtual==rfEsperado&&fatorAcucarAtual==fatorAcucarEsperador){
            return{leite:quantidadeLeite,preIntegral:quantiddaePreIntegral,preDesnatado:quantidadePreDesnatado,butterOil:quantidadeButterOil};
          }
        }
      }
      //se o snf estiver mais alto que o snf desejado e estiver usando pre desnatado retirar o pre desnatado ate o snf atingir o desejado
      if (totalSnf > esperadoSnf && quantidadePreDesnatado > 0) {
        while (totalSnf > esperadoSnf) {
          quantidadePreDesnatado--;
          totalGorduraPreDesnatado = this.calcularGordura(gorduraPreDesnatado, quantidadePreDesnatado);
          totalSnfPreDesnatado = this.calcularSnf(snfPreDesnatado, quantidadePreDesnatado);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
          rfAtual=parseFloat(this.calcularRf(totalGordura,totalSnf))
          fatorAcucarAtual=parseFloat(this.calcularFatorAcucar(acucar,totalGordura))
          if(tfAtual==tfEsperado&&rfAtual==rfEsperado&&fatorAcucarAtual==fatorAcucarEsperador){
            return{leite:quantidadeLeite,preIntegral:quantiddaePreIntegral,preDesnatado:quantidadePreDesnatado,butterOil:quantidadeButterOil};
          }
        }


      }
      //se o a gordura e o snf estiverem altos retirar pre integral ate atingir o snf objetivo
      if (totalGordura > esperadoGordura && totalSnf > esperadoSnf) {
        while (totalSnf > esperadoSnf) {
          quantiddaePreIntegral--;
          totalGorduraPreIntegral = this.calcularGordura(gorduraPreIntegral, quantiddaePreIntegral);
          totalSnfPreIntegral = this.calcularSnf(snfPreIntegral, quantiddaePreIntegral);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
          rfAtual=parseFloat(this.calcularRf(totalGordura,totalSnf))
          fatorAcucarAtual=parseFloat(this.calcularFatorAcucar(acucar,totalGordura))
          if(tfAtual==tfEsperado&&rfAtual==rfEsperado&&fatorAcucarAtual==fatorAcucarEsperador){
            return{leite:quantidadeLeite,preIntegral:quantiddaePreIntegral,preDesnatado:quantidadePreDesnatado,butterOil:quantidadeButterOil};
          }
        }


      }
      //se o snf estiver alto e nao estiver usando pre desnatado retirar pre integral ate snf atingir o objetivo
      if (totalSnf > esperadoSnf && quantidadePreDesnatado == 0) {
        while (totalSnf > esperadoSnf) {
          quantiddaePreIntegral--;
          totalGorduraPreIntegral = this.calcularGordura(gorduraPreIntegral, quantiddaePreIntegral);
          totalSnfPreIntegral = this.calcularSnf(snfPreIntegral, quantiddaePreIntegral);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
          rfAtual=parseFloat(this.calcularRf(totalGordura,totalSnf))
          fatorAcucarAtual=parseFloat(this.calcularFatorAcucar(acucar,totalGordura))
          if(tfAtual==tfEsperado&&rfAtual==rfEsperado&&fatorAcucarAtual==fatorAcucarEsperador){
            return{leite:quantidadeLeite,preIntegral:quantiddaePreIntegral,preDesnatado:quantidadePreDesnatado,butterOil:quantidadeButterOil};
          }
        }


      }
      if (totalGordura > esperadoGordura && quantidadeButterOil == 0) {
        while (totalGordura > esperadoGordura) {
          quantiddaePreIntegral--;
          totalGorduraPreIntegral = this.calcularGordura(gorduraPreIntegral, quantiddaePreIntegral);
          totalSnfPreIntegral = this.calcularSnf(snfPreIntegral, quantiddaePreIntegral);
          totalSnf = totalSnfLeite + totalSnfPreIntegral + totalSnfPreDesnatado + totalSnfButterOil;
          totalGordura = totalGorduraLeite + totalGorduraPreIntegral + totalGorduraPreDesnatado + totalGorduraButterOil;
          totalPartida = quantidadeLeite + quantidadeButterOil + quantiddaePreIntegral + quantidadePreDesnatado;
          tfAtual = parseFloat(this.calcularTf(totalGordura, totalSnf, acucar, totalPartida));
          rfAtual=parseFloat(this.calcularRf(totalGordura,totalSnf))
          fatorAcucarAtual=parseFloat(this.calcularFatorAcucar(acucar,totalGordura))
          if(tfAtual==tfEsperado&&rfAtual==rfEsperado&&fatorAcucarAtual==fatorAcucarEsperador){
            return{leite:quantidadeLeite,preIntegral:quantiddaePreIntegral,preDesnatado:quantidadePreDesnatado,butterOil:quantidadeButterOil};
          }
        }


      }
    }
    return{leite:quantidadeLeite,preIntegral:quantiddaePreIntegral,preDesnatado:quantidadePreDesnatado,butterOil:quantidadeButterOil};
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
  private calcularFatorAcucar(acucar:number,totalGordura:number){
    return( acucar/totalGordura).toFixed(2)

  }
  private calcularRf(totalGordura:number,totalSnf:number){
    return (totalGordura/totalSnf).toFixed(3)
  }



}
