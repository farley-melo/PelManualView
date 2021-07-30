import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DepositosService} from '../../cadastro/cadastro-estoque-materias-primas/depositos.service';
import {ActivatedRoute} from '@angular/router';
import {Estoque} from '../../cadastro/cadastro-estoque-materias-primas/estoque';
import {EstoqueService} from './estoque.service';
import {Tl} from '../../lancar-tl/lancar-tl/tl';
import {MateriaPrima} from '../../cadastro/cadastro-materias-primas/materia-prima';
import {Analise} from '../../entidades/analise';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  estoqueForm: FormGroup;
  listaDepositos: any[];
  static indiceGeral: number = 0;
  indiceRelativo: number = 0;
  listaDeTlsPorTanque: Tl[];
  listaDeMateriasPrimasPorTanque: Set<any>;
  materiaPrimaValor: any[] = [];
  totalDeMateriasPrimas: number = 0;
  mostrarResultados = true;
  mostrarBotaoSalvar = false;
  @ViewChild('sucesso') sucessoTemplate: TemplateRef<any>;
  @ViewChild('error')errorTemplate:TemplateRef<any>
  sucessModalRef: BsModalRef;
  errorModalRef:BsModalRef;

  constructor(private formBuilder: FormBuilder,
              private depositoService: DepositosService,
              private router: ActivatedRoute,
              private estoqueService: EstoqueService,
              private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.estoqueForm = this.formBuilder.group({
      gordura: [{value: '', disabled: true}, [Validators.required]],
      snf: [{value: '', disabled: true}, [Validators.required]],
      densidade: [{value: '', disabled: true}, [Validators.required]],
      status: [{value: '', disabled: true}]
    });
    this.router.data.subscribe(depositos => {

      this.listaDepositos = depositos.listaDepositos;
      let gordura = this.estoqueForm.get('gordura');
      let snf = this.estoqueForm.get('snf');
      let densidade = this.estoqueForm.get('densidade');
      let status = this.estoqueForm.get('status');
      this.mostrarInformaçoesTanque();
      gordura?.setValue(depositos.listaDepositos[0].analise.gordura);
      snf?.setValue(depositos.listaDepositos[0].analise.snf);
      densidade?.setValue(depositos.listaDepositos[0].analise.densidade);
      status?.setValue(depositos.listaDepositos[0].analise.status);
    });
  }

  salvar() {
    if (this.estoqueForm.valid) {
      if (this.estoqueForm.get('gordura')?.enabled && this.estoqueForm.get('snf') && this.estoqueForm.get('densidade')) {
        let gordura = this.estoqueForm.get('gordura')?.value;
        let snf = this.estoqueForm.get('snf')?.value;
        let densidade = this.estoqueForm.get('densidade')?.value;
        let status = this.estoqueForm.get('status')?.value;
        let nomeTanque = this.listaDepositos[this.indiceRelativo].nome;
        let analise: Analise = new Analise();
        analise.gordura = gordura;
        analise.status = status;
        analise.densidade = densidade;
        analise.snf = snf;
        analise.nomeDeposito = nomeTanque;
        this.estoqueService.atualizarAnaliseDoDeposito(nomeTanque, analise).subscribe(deposito => {
          this.desabilitar();
          this.sucessModalRef = this.modalService.show(this.sucessoTemplate, {class: 'modal-dialog-centered'});
          setTimeout(() => {
            this.sucessModalRef.hide();
          }, 1000);
          this.mostrarBotaoSalvar = false;
        });
      }
    }else{
      this.errorModalRef=this.modalService.show(this.errorTemplate,{class:'modal-dialog-centered'})
      setTimeout(()=>{
        this.errorModalRef.hide()
      },1000)
    }
  }

  carregarFormulario() {
    let gordura = this.estoqueForm.get('gordura');
    let snf = this.estoqueForm.get('snf');
    let densidade = this.estoqueForm.get('densidade');
    let status = this.estoqueForm.get('status');
    gordura?.setValue(this.listaDepositos[this.indiceRelativo].analise.gordura);
    snf?.setValue(this.listaDepositos[this.indiceRelativo].analise.snf);
    densidade?.setValue(this.listaDepositos[this.indiceRelativo].analise.densidade);
    status?.setValue(this.listaDepositos[this.indiceRelativo].analise.status);
  }

  avancar() {
    EstoqueComponent.indiceGeral++;
    this.mostrarBotaoSalvar = false;
    if (EstoqueComponent.indiceGeral < this.listaDepositos.length) {
      this.indiceRelativo = EstoqueComponent.indiceGeral;
      this.mostrarInformaçoesTanque();
      this.carregarFormulario();
      this.atualizarAnaliseAoMudarDeTanque();
      this.desabilitar();
    }
  }

  recuar() {
    this.mostrarBotaoSalvar = false;
    if (this.indiceRelativo > this.listaDepositos.length - this.listaDepositos.length) {
      EstoqueComponent.indiceGeral = this.indiceRelativo;
      EstoqueComponent.indiceGeral--;
      this.indiceRelativo = EstoqueComponent.indiceGeral;
      this.mostrarInformaçoesTanque();
      this.carregarFormulario();
      this.atualizarAnaliseAoMudarDeTanque();
      this.desabilitar();
    }
  }

  mostrarInformaçoesTanque() {
    this.atualizarMateriasPrimasAoMudarDeTanque();
  }

  private atualizarMateriasPrimasAoMudarDeTanque() {
    this.estoqueService.buscarTlPeloTanque(this.listaDepositos[this.indiceRelativo].nome).subscribe(lista => {
      this.listaDeTlsPorTanque = lista.sort((a, b) => {
        if (a.materiaPrima > b.materiaPrima) {
          return 1;
        }
        if (a.materiaPrima < b.materiaPrima) {
          return -1;
        }
        return 0;
      });
      this.listaDeMateriasPrimasPorTanque = new Set(lista.map(tl => tl.materiaPrima));
      this.calcularTotalDeMateriasPrimasDoTanque();
      this.materiaPrimaValor = [];
      this.mostrarResultados = true;
    }, error => {
      this.mostrarResultados = false;
      this.totalDeMateriasPrimas = 0;
    });
  }

  private atualizarAnaliseAoMudarDeTanque() {
    this.estoqueService.obterAnaliseDoDeposito(this.listaDepositos[this.indiceRelativo].nome)
      .subscribe((result: Analise) => {
        let gordura = this.estoqueForm.get('gordura');
        let snf = this.estoqueForm.get('snf');
        let densidade = this.estoqueForm.get('densidade');
        let status = this.estoqueForm.get('status');
        gordura?.setValue(result.gordura);
        snf?.setValue(result.snf);
        densidade?.setValue(result.densidade);
        status?.setValue(result.status);
      });
  }

  private calcularTotalDeMateriasPrimasDoTanque() {
    let total: number = 0;
    this.estoqueService.buscarTlPeloTanque(this.listaDepositos[this.indiceRelativo].nome).subscribe(lista => {
      lista.forEach(tl => {
        total += tl.kilosRecebidos;
      });
      this.listaDeMateriasPrimasPorTanque.forEach(m => {
        let tlFiltrado = lista.filter((tl: Tl) => tl.materiaPrima === m);
        let result = 0;
        for (let x = 0; x < tlFiltrado.length; x++) {
          result += tlFiltrado[x].kilosRecebidos;
        }
        this.materiaPrimaValor.push({nome: m, valor: result});
      });
      this.totalDeMateriasPrimas = total;
    });
  }

  editar() {
    this.mostrarBotaoSalvar = true;
    this.estoqueForm.get('gordura')?.enable();
    this.estoqueForm.get('snf')?.enable();
    this.estoqueForm.get('densidade')?.enable();
    this.estoqueForm.get('status')?.enable();
  }

  desabilitar() {
    this.estoqueForm.get('gordura')?.disable();
    this.estoqueForm.get('snf')?.disable();
    this.estoqueForm.get('densidade')?.disable();
    this.estoqueForm.get('status')?.disable();
  }
}
