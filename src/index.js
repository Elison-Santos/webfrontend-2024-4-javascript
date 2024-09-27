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
    let numeroDaMesa;
    let i = 0;
    numeroDaMesa = readline.question('Digite o numero da Mesa de 1 a 30: ');

    //valido a mesa de 1 a 30 
    while( i == 0){
        if(numeroDaMesa > 0 && numeroDaMesa <= 30){
            i++;
        }else{
            console.log("Mesa inválida!");
            numeroDaMesa = readline.question('Digite o numero da Mesa de 1 a 30: ');
        }
    }

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

function aplicarDesconto(){
    //10% se o pagamento for via PIX ou dinheiro.
    return pedidosRestaurante.pedidos[0].valorTotal * 0.9;
}
//pix 1, dinheiro 2, cartão 3 
//Faça sua lógica para aplicar o desconto apenas para PIX OU DINHEIRO
function fecharPedido(){
    switch(pedidosRestaurante.pedidos[0].metodoDePagamento){
        case 1 :
            pedidosRestaurante.pedidos[0].valorComDesconto = aplicarDesconto();
            valorPorPessoa = pedidosRestaurante.pedidos[0].valorComDesconto / pedidosRestaurante.pedidos[0].numeroDePessoas;
            console.log(valorPorPessoa.toFixed(2))
            break;
        case 2 :
            pedidosRestaurante.pedidos[0].valorComDesconto = aplicarDesconto();
            valorPorPessoa = pedidosRestaurante.pedidos[0].valorComDesconto / pedidosRestaurante.pedidos[0].numeroDePessoas;
            break;
        case 3 :
            valorPorPessoa = pedidosRestaurante.pedidos[0].valorTotal / pedidosRestaurante.pedidos[0].numeroDePessoas;
            break;    
    }
}

// Exibindo os resultados
function exibirResultados(){
    console.log(`\na mesa ${pedidosRestaurante.pedidos[0].numeroDaMesa} tem ${ pedidosRestaurante.pedidos[0].numeroDePessoas} pessoas, cada uma deve pagar ${valorPorPessoa.toFixed(2)} Reais\n`);
}

//menu para escolha de função
function menu(){
    i =0;
    while(i == 0){
        console.log("1 iniciar pedido\n2 fechar o pedido\n3 exibir resultados\n4 Sair");
        let opcao = readline.question('Digite a opção de menu escolhida: ');
        switch(opcao){
            case "1" :console.log("aqui")
                adicionarPedido();
                break;
            case "2" :
                fecharPedido()
                break;
            case "3":
                exibirResultados();
                break;
            default :
                i +=1;    
        }
    }
}
menu();