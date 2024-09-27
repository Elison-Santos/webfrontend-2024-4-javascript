// Importando a biblioteca readline-sync
const readline = require('readline-sync');
//variávei globais
const pedidosRestaurante = {
    pedidos: [
      {
        numeroDaMesa : 0,
        numeroDePessoas: 0,
        valorTotal : 0 ,
        metodoDePagamento : 0,
        valorComDesconto : 0
      }
    ]
  };
  let valorPorPessoa;

//função para adicionar um pedido 
function adicionarPedido(){
    //capturando o numero da mesa
    const numeroDaMesa = readline.question('Digite o numero da Mesa: ');

    // Capturando o número de pessoas na mesa
    const numeroDePessoas = readline.questionInt('Digite o numero de pessoas na mesa: ');

    // Capturando o valor total da conta
    const valorTotal= readline.questionFloat('Digite o valor total da conta: ');

    // Capturando o método de pagamento
    const metodoDePagamento = readline.questionInt('Qual e o metodo de pagamento (PIX, dinheiro ou cartao)? ');

    //apago a inicialização que fiz com 0 em tudo 
    pedidosRestaurante.pedidos = pedidosRestaurante.pedidos.filter(function(jsonObject) {
        jsonObject["numeroDePessoas"] == 0;
    });

    pedidosRestaurante.pedidos.push(
        { numeroDaMesa : numeroDaMesa, numeroDePessoas: numeroDePessoas, valorTotal : valorTotal, metodoDePagamento : metodoDePagamento}
    );
    
}
//console.log(pedidosRestaurante.pedidos.findIndex())
adicionarPedido();

function aplicarDesconto(){
    //10% se o pagamento for via PIX ou dinheiro.
    return pedidosRestaurante.pedidos[0].valorTotal * 0.9;
}

//console.log(pedidosRestaurante);

//pix 1, dinheiro 2, cartão 3 
//Faça sua lógica para aplicar o desconto apenas para PIX OU DINHEIRO
//function fecharConta(){

//}
switch(pedidosRestaurante.pedidos[0].metodoDePagamento){
    case 1 :
        pedidosRestaurante.pedidos[0].valorComDesconto = aplicarDesconto();
        valorPorPessoa = pedidosRestaurante.pedidos[0].valorComDesconto / pedidosRestaurante.pedidos[0].numeroDePessoas;
        console.log(valorPorPessoa)
        break;
    case 2 :
        pedidosRestaurante.pedidos[0].valorComDesconto = aplicarDesconto();
        valorPorPessoa = pedidosRestaurante.pedidos[0].valorComDesconto / pedidosRestaurante.pedidos[0].numeroDePessoas;
        break;
    case 3 :
        valorPorPessoa = pedidosRestaurante.pedidos[0].valorTotal / pedidosRestaurante.pedidos[0].numeroDePessoas;
        break;    
}

// Exibindo os resultados

console.log(`a mesa ${pedidosRestaurante.pedidos[0].numeroDaMesa} tem ${ pedidosRestaurante.pedidos[0].numeroDePessoas} pessoas, cada uma deve pagar ${valorPorPessoa} Reais`);