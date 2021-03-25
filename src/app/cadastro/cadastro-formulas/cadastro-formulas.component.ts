import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {MateriaPrima} from '../cadastro-materias-primas/materia-prima';
import {Formula} from './formula';

@Component({
  selector: 'app-cadastro-formulas',
  templateUrl: './cadastro-formulas.component.html',
  styleUrls: ['./cadastro-formulas.component.css']
})
export class CadastroFormulasComponent implements OnInit {

  formularioCadastro:FormGroup;
  @ViewChild('errorTemplate') errorTemplate:TemplateRef<any>;
  referenciaModalError:BsModalRef;
  listaFormulasResult:Formula[]=[];
  @ViewChild('desejaDeletartemplate')desejaDeletartemplate:TemplateRef<any>;
  referenciaModalDeletar:BsModalRef;
  indiceParaDelecaoFormula:number=0;

  constructor(private formsBuilder:FormBuilder,
              private modalService:BsModalService) { }

  ngOnInit(): void {
    this.formularioCadastro=this.formsBuilder.group({
      gordura:['',[Validators.required]],
      fatorAcucarMinimo:['',[Validators.required]],
      fatorAcucar:['',[Validators.required]],
      fatorAcucarMaximo:['',[Validators.required]],
      rfMinimo:['',[Validators.required]],
      rf:['',[Validators.required]],
      rfMaximo:['',[Validators.required]],
      acucar:['',[Validators.required]],
    });
  }

  cadastrar() {
    if(this.formularioCadastro.valid){
      let formula:Formula=new Formula();
      formula.gordura=this.formularioCadastro.get('gordura')?.value;
      formula.fatorAcucarMin=this.formularioCadastro.get('fatorAcucarMinimo')?.value
      formula.fatorAcucar=this.formularioCadastro.get('fatorAcucar')?.value;
      formula.fatorAcucarMax=this.formularioCadastro.get('fatorAcucarMaximo')?.value
      formula.rfMin=this.formularioCadastro.get('rfMinimo')?.value
      formula.rf=this.formularioCadastro.get('rf')?.value;
      formula.rfMax=this.formularioCadastro.get('rfMaximo')?.value
      formula.acucar=this.formularioCadastro.get('acucar')?.value;
      this.listaFormulasResult.push(formula);
      this.formularioCadastro.reset();

    }else{
      this.referenciaModalError=this.modalService.show(this.errorTemplate,{class:'modal-dialog-centered'});
      let listarErrors:string[]=[];
      Object.keys(this.formularioCadastro.controls).forEach(formNome=>{
        if(formNome=='gordura'&&this.formularioCadastro.get(formNome)?.invalid){
          listarErrors.push('A gordura não pode estar em branco')
        }
        if(formNome=='fatorAcucarMinimo'&&this.formularioCadastro.get(formNome)?.invalid){
          listarErrors.push('O fator açucar minimo não pode estar em branco')
        }
        if(formNome=='fatorAcucar'&&this.formularioCadastro.get(formNome)?.invalid){
          listarErrors.push('O fator açucar objetivo não pode estar em branco')
        }
        if(formNome=='fatorAcucarMaximo'&&this.formularioCadastro.get(formNome)?.invalid){
          listarErrors.push('O fator açucar maximo não pode estar em branco')
        }
        if(formNome=='rfMinimo'&&this.formularioCadastro.get(formNome)?.invalid){
          listarErrors.push('O rf minimo não pode estar em branco')
        }
        if(formNome=='rf'&&this.formularioCadastro.get(formNome)?.invalid){
          listarErrors.push('O rf objetivo não pode estar em branco')
        }
        if(formNome=='rfMaximo'&&this.formularioCadastro.get(formNome)?.invalid){
          listarErrors.push('O rf maximo não pode estar em branco')
        }
        if(formNome=='acucar'&&this.formularioCadastro.get(formNome)?.invalid){
          listarErrors.push('A açucar não pode estar em branco')
        }
      });
      this.referenciaModalError.content=listarErrors;

    }
  }

  excluirFormula(i: number) {
    this.indiceParaDelecaoFormula=i;
    this.referenciaModalDeletar=this.modalService.show(this.desejaDeletartemplate,{class:'modal-dialog-centered'});
  }

  confirm() {
    this.listaFormulasResult.splice(this.indiceParaDelecaoFormula,1);
    this.referenciaModalDeletar.hide();
  }

  decline() {
    this.referenciaModalDeletar.hide();
  }

}
