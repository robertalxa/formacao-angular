import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from '../criar-pensamento/minusculoValidators';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css'],
})
export class EditarPensamentoComponent implements OnInit {
  formulario!: FormGroup;
  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    const regexEmptyValue = /(.|\s)*\S(.|s)*/;

    const id = this.route.snapshot.paramMap.get('id');

    this.service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        id: [pensamento.id],
        conteudo: [
          pensamento.conteudo,
          Validators.compose([
            Validators.required,
            Validators.pattern(regexEmptyValue),
          ]),
        ],
        autoria: [
          pensamento.autoria,
          Validators.compose([
            Validators.required,
            Validators.pattern(regexEmptyValue),
            Validators.minLength(3),
            minusculoValidator,
          ]),
        ],
        modelo: [pensamento.modelo],
        favorito: [pensamento.favorito]
      });
    });
  }

  ngOnInit(): void {}

  editarPensamento() {
    if (this.formulario.valid) {
      this.service.editar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelarForm() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitaBotao() {
    if (this.formulario.valid) return 'botao';
    return 'botao__invalido';
  }
}
