import { Component, OnInit } from '@angular/core';
// Cada página deve conter esse import para fazer
// requisição ao servidor
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {
  // Declarar todas as variáveis no início da classe
  // As variáveis precisam ser declaradas com um tipo
  // Tipos: number, array, string, any (quando estiver em dúvida de qual tipo usar)
  notas: any;

  // O componente HttpCliente para funcionar precisa ser declarado
  // como parâmetro do construtor. Para isso, cria-se uma variável
  // pública chamada http que recebe a classe HttpCliente
  constructor(public http: HttpClient) { }

  // Essa função (ngOnInit) é padrão do Ionic. É uma das funções do
  // ciclo de vida da aplicação. ngOnInit é executada quando
  // entra na página pela primeira vez. Existem vários outras
  // funções para tratar: ao sair da página, ao voltar, etc
  // é só procurar no google ionic 3 ciclo de vida
  ngOnInit() {
  	
  }

  // Todas as nossas funções são criadas fora do ngOnInit
  // Depois é realizado apenas a chamda lá dentro

  buscaNotas(bimestre: string) {
  	// Dentro da função, todos as variáveis declaradas no início da classe ou no construtor
  	// devem ser chamadas utilizando o this antes. Ex: this.notas
    this.http.get(`http://escolamaisfacil.com.br/sigma/escolar/notas2_json.php?id=330&b=${bimestre}`)
      .subscribe((r:any) => {
        console.log('resposta notas');
        this.notas = r.notas;
        console.log(r);
      }, (e:any) => {
        console.log('erro notas');
      });
  }

  segmentChanged(ev: any) {
    this.buscaNotas(ev.detail.value)
  }



}
