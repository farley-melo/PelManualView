import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {CarregarMateriasPrimasService} from './carregar-materias-primas.service';

@Component({
  selector: 'app-cadastro-estoque-materias-primas',
  templateUrl: './cadastro-estoque-materias-primas.component.html',
  styleUrls: ['./cadastro-estoque-materias-primas.component.css']
})
export class CadastroEstoqueMateriasPrimasComponent implements OnInit {

  listaDeMateriasPrimas:string[]=[];
  formularioCadastro:FormGroup;

  constructor(private formsBuilder:FormBuilder,
              private carregarMateriasPrimasService:CarregarMateriasPrimasService) { }

  ngOnInit(): void {
    this.listaDeMateriasPrimas=this.carregarMateriasPrimasService.carregarMateriasPrimas();
    this.formularioCadastro=this.formsBuilder.group({
      nome:[],
      capacidade:[],
      materiasPrimas:new FormArray([])
    });
    this.addFormArray();
  }

  obterFormArray():FormArray{
   return  this.formularioCadastro.get('materiasPrimas') as FormArray;
  }

  addFormArray(){
    this.listaDeMateriasPrimas.forEach(materiasPrimas=>{
      this.obterFormArray().push(new FormControl(false));
    });
  }

}
