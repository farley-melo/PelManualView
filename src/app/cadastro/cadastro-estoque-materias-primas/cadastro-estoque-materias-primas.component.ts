import {Component, OnInit, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {CarregarMateriasPrimasService} from './carregar-materias-primas.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';

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

  constructor(private formsBuilder:FormBuilder,
              private carregarMateriasPrimasService:CarregarMateriasPrimasService,
              private modalService:BsModalService) { }

  ngOnInit(): void {
    this.listaDeMateriasPrimas=this.carregarMateriasPrimasService.carregarMateriasPrimas();
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
    }else{
      this.referenciaModalError=this.modalService.show(this.errorTemplate,{class:'modal-dialog-centered'})
    }
  }
}
