import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Estoque} from '../cadastro-estoque-materias-primas/estoque';
import {EstoqueMateriaPrimaService} from '../cadastro-estoque-materias-primas/estoque-materia-prima.service';
import {MateriaPrimaService} from './materia-prima.service';
import {MateriaPrima} from './materia-prima';

@Component({
  selector: 'app-cadastro-materias-primas',
  templateUrl: './cadastro-materias-primas.component.html',
  styleUrls: ['./cadastro-materias-primas.component.css']
})
export class CadastroMateriasPrimasComponent implements OnInit {
  formularioCadastro:FormGroup;
  @ViewChild('errorTemplate') errorTemplate:TemplateRef<any>;
  referenciaModalError:BsModalRef;
  listaMateriaPrimaResult:MateriaPrima[]=[];
  @ViewChild('desejaDeletartemplate')desejaDeletartemplate:TemplateRef<any>;
  referenciaModalDeletar:BsModalRef;
  indiceParaMateriaPrima:number=0;

  constructor(private formsBuilder:FormBuilder,
              private modalService:BsModalService) { }

  ngOnInit(): void {
    this.formularioCadastro=this.formsBuilder.group({
      nome:['',[Validators.required]],
      codigo:['',[Validators.required]],
      procedencia:['',[Validators.required]]
    });
  }

  cadastrar() {
    if(this.formularioCadastro.valid){
       let materiaPrima:MateriaPrima=new MateriaPrima();
       materiaPrima.nome=this.formularioCadastro.get('nome')?.value;
       materiaPrima.codigo=this.formularioCadastro.get('codigo')?.value;
       materiaPrima.procedencia=this.formularioCadastro.get('procedencia')?.value
       this.listaMateriaPrimaResult.push(materiaPrima);
       this.formularioCadastro.reset();

    }else{
      this.referenciaModalError=this.modalService.show(this.errorTemplate,{class:'modal-dialog-centered'});
      let listaDeErros:string[]=[]
      Object.keys(this.formularioCadastro.controls).forEach(nomeControle=>{
        if(nomeControle=='nome'&&this.formularioCadastro.get(nomeControle)?.invalid){
          listaDeErros.push('O nome da materia prima nao pode estar em branco')
        }
        if(nomeControle=='codigo'&&this.formularioCadastro.get(nomeControle)?.invalid){
          listaDeErros.push('O codigo da materia prima nao pode estar em branco')
        }
        if(nomeControle=='procedencia'&&this.formularioCadastro.get(nomeControle)?.invalid){
          listaDeErros.push('A procedencia da materia prima nao pode estar em branco')
        }
      })

      this.referenciaModalError.content=listaDeErros;
    }
  }

  excluirMateriaPrima(i: number) {
    this.indiceParaMateriaPrima=i;
    this.referenciaModalDeletar=this.modalService.show(this.desejaDeletartemplate,{class:'modal-dialog-centered'});
  }

  confirm() {
    this.listaMateriaPrimaResult.splice(this.indiceParaMateriaPrima,1);
    this.referenciaModalDeletar.hide();
  }

  decline() {
    this.referenciaModalDeletar.hide();
  }

}
