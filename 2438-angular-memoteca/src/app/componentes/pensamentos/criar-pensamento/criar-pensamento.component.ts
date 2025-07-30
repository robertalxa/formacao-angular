import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from './minusculoValidators';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.css'],
})
export class CriarPensamentoComponent implements OnInit {
  formulario!: FormGroup;

  constructor(
    private service: PensamentoService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const regexEmptyValue = /(.|\s)*\S(.|s)*/;
    this.formulario = this.formBuilder.group({
      conteudo: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(regexEmptyValue),
        ]),
      ],
      autoria: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(regexEmptyValue),
          Validators.minLength(3),
          minusculoValidator,
        ]),
      ],
      modelo: ['modelo1'],
    });
  }

  criarPensamento() {
    if (this.formulario.valid) {
      this.service.criar(this.formulario.value).subscribe((pensamento) => {
        alert(`Pensamento de "${pensamento.autoria}" cadastrado!`);
        this.router.navigate(['/listarPensamento']);
      });
    }
  }

  cancelarForm() {
    this.router.navigate(['/listarPensamento']);
  }

  habilitarBotao() {
    if (this.formulario.valid) return 'botao';
    return 'botao__desabilitado';
  }
}
