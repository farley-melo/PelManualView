import {Component, OnInit, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {EstoqueMateriaPrimaService} from './estoque-materia-prima.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {Estoque} from './estoque';
import {MateriaPrimaService} from '../cadastro-materias-primas/materia-prima.service';

@Component({
  selector: 'app-cadastro-estoque-materias-primas',
  templateUrl: './cadastro-estoque-materias-primas.component.html',
  styleUrls: ['./cadastro-estoque-materias-primas.component.css']
})
export class CadastroEstoqueMateriasPrimasComponent implements OnInit {

  listaDeMateriasPrimas:string[]=[];
  formularioCadastro:FormGroup;
  @ViewChild('errorTemplate') errorTemplate:TemplateRef<any>;
  referenciaModalError:BsModalRef;
  listaTanque:Estoque[]=[];
  @ViewChild('desejaDeletartemplate')desejaDeletartemplate:TemplateRef<any>;
  referenciaModalDeletar:BsModalRef;
  indiceParaDeleçaoTanque:number=0;

  constructor(private formsBuilder:FormBuilder,
              private materiaPrimaService:MateriaPrimaService,
              private modalService:BsModalService) { }

  ngOnInit(): void {
    this.listaDeMateriasPrimas=this.materiaPrimaService.carregarListaDemateriasPrimas();
    this.formularioCadastro=this.formsBuilder.group({
      nome:['',[Validators.required]],
      capacidade:['',Validators.required],
      materiasPrimas:this.addFormArray()
    });
  }

  obterFormArray():FormArray{
   return  this.formularioCadastro.get('materiasPrimas') as FormArray;
  }

  addFormArray(){
    let values=this.listaDeMateriasPrimas.map(materiaPrima=>new FormControl(false));
    return this.formsBuilder.array(values,[this.peloMenosUmCheckBoxValidation(1)])
  }

  //validacoes
  somenteNumeros($event: KeyboardEvent) {
    let patt = /^([0-9])$/;
    let result = patt.test($event.key);
    return result;

  }
  peloMenosUmCheckBoxValidation(min:number=1){
    let validator=(form:AbstractControl)=>{
       const totalChecked=(<FormArray>form).controls
         .map(v => v.value)
         .reduce((total,current)=>current?total+current:total,0);
       return totalChecked>=min ? null:{checkboxError:'Deve marcar ao menos um check box'};
    };
    return validator;
  }

  cadastrar() {
    if(this.formularioCadastro.valid){
      //cadatra o tanque no banco de dados
      let estoque:Estoque=new Estoque();
      let listaMateriaPrimaResult:string[]=[];
      estoque.nome=this.formularioCadastro.get('nome')?.value;
      estoque.capacidade=this.formularioCadastro.get('capacidade')?.value;
      for (let i=0;i<this.listaDeMateriasPrimas.length;i++){
        if(this.obterFormArray().controls[i].value==true){
          listaMateriaPrimaResult.push(this.listaDeMateriasPrimas[i]);
        }
      }
      estoque.materiasPrimas=listaMateriaPrimaResult;
      this.listaTanque.push(estoque);
      this.formularioCadastro.reset();
    }else{
      this.referenciaModalError=this.modalService.show(this.errorTemplate,{class:'modal-dialog-centered'});
      let listarErrors:string[]=[];
      Object.keys(this.formularioCadastro.controls).forEach(formNome=>{
        if(formNome=='nome'&&this.formularioCadastro.get(formNome)?.invalid){
          listarErrors.push('O nome nao pode estar em branco')
        }
        if(formNome=='capacidade'&&this.formularioCadastro.get(formNome)?.invalid){
          listarErrors.push('A capacidade nao pode estar em branco')
        }
        if(formNome=='materiasPrimas'&&this.formularioCadastro.get(formNome)?.invalid){
          listarErrors.push('Deve haver pelo menos uma materia prima selecionada')
        }
      })
      this.referenciaModalError.content=listarErrors;
    }
  }

  excluirEstoque(i: number) {
    this.indiceParaDeleçaoTanque=i;
    this.referenciaModalDeletar=this.modalService.show(this.desejaDeletartemplate,{class:'modal-dialog-centered'});
  }

  confirm() {
    this.listaTanque.splice(this.indiceParaDeleçaoTanque,1);
    this.referenciaModalDeletar.hide();
  }

  decline() {
    this.referenciaModalDeletar.hide();
  }
}
