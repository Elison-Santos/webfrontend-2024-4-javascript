// Importando a biblioteca readline-sync
const readline = require('readline-sync');
//variávei globais
const pedidosRestaurante = {
    pedidos: []
};
let valorPorPessoa;
  
//função para adicionar um pedido 
function adicionarPedido(){
    let mesa = selecionarMesa();
    //capturando o numero da mesa
    let i = 0;

    // Capturando o número de pessoas na mesa
    const numeroDePessoas = readline.questionInt('Digite o numero de pessoas na mesa de 1 a 6: ');
    while( i == 0){
        if(numeroDePessoas > 0 && numeroDePessoas <= 6){
            i++;
        }else{
            console.log("numero de pessoas inválida!");
            numeroDePessoas = readline.question('Digite o numero de pessoas na mesa de 1 a 6: ');
        }
    }

    //apago a inicialização que fiz com 0 em tudo 
    //pedidosRestaurante.pedidos = pedidosRestaurante.pedidos.filter(function(jsonObject) {
        //jsonObject["numeroDePessoas"] == 0;
    //});

    pedidosRestaurante.pedidos.push(
        { numeroDaMesa : mesa, numeroDePessoas: numeroDePessoas} 
    );
    console.log(pedidosRestaurante);
}

function selecionarMesa(){
    let numeroDaMesa;
    let i = 0;
    numeroDaMesa = readline.question('Digite o numero da Mesa de 1 a 15: ');

    //valido a mesa de 1 a 30 
    while( i == 0){
        if(numeroDaMesa > 0 && numeroDaMesa <= 15){
            i++;
        }else{
            console.log("Mesa inválida!");
            numeroDaMesa = readline.question('Digite o numero da Mesa de 1 a 15: ');
        }
    }
    return numeroDaMesa;
}

function capturarTotal(){
    let mesa = selecionarMesa();
    let index = pedidosRestaurante.pedidos.findIndex(pedidos => pedidos.numeroDaMesa === mesa);
        //Capturando o valor da conta
        const valorTotal= readline.questionFloat('Digite o valor total da conta: ');
        pedidosRestaurante.pedidos[index].valorTotal = valorTotal;
        console.log(pedidosRestaurante.pedidos.find(pedidos => pedidos.numeroDaMesa === mesa));
        return index;
}

function aplicarDesconto(){
    //10% se o pagamento for via PIX ou dinheiro.
    return pedidosRestaurante.pedidos[0].valorTotal * 0.9;
}

//Faça sua lógica para aplicar o desconto apenas para PIX OU DINHEIRO
function fecharPedido(){
    let index  = capturarTotal();
    console.log(index);
    
    pedidosRestaurante.pedidos[index].metodoDePagamento = readline.questionInt('Qual e o metodo de pagamento (1 - PIX, 2 - dinheiro ou  3 - cartao)? ');
    switch(pedidosRestaurante.pedidos[index].metodoDePagamento){
        case 1 :
            pedidosRestaurante.pedidos[index].valorComDesconto = aplicarDesconto();
            valorPorPessoa = pedidosRestaurante.pedidos[index].valorComDesconto / pedidosRestaurante.pedidos[index].numeroDePessoas;
            console.log(valorPorPessoa.toFixed(2))
            break;
        case 2 :
            pedidosRestaurante.pedidos[index].valorComDesconto = aplicarDesconto();
            valorPorPessoa = pedidosRestaurante.pedidos[index].valorComDesconto / pedidosRestaurante.pedidos[index].numeroDePessoas;
            break;
        case 3 :
            valorPorPessoa = pedidosRestaurante.pedidos[index].valorTotal / pedidosRestaurante.pedidos[index].numeroDePessoas;
            break;    
    }
    console.log( pedidosRestaurante.pedidos);
}

// Exibindo os resultados
function exibirResultados(){
    let index = pedidosRestaurante.pedidos.findIndex(pedidos => pedidos.numeroDaMesa === selecionarMesa());
    console.log(`\na mesa ${pedidosRestaurante.pedidos[index].numeroDaMesa} tem ${ pedidosRestaurante.pedidos[index].numeroDePessoas} 
        pessoas, cada uma deve pagar ${valorPorPessoa.toFixed(index)} Reais, valor total de R$${pedidosRestaurante.pedidos[index].valorTotal}\n`);
}

//menu para escolha de função
function menu(){
    i =0;
    while(i == 0){
        console.log("~~~~~~~~~~~~~~~~~~~~ Restaurante do Elison ~~~~~~~~~~~~~~~~~~~~")
        console.log("1 iniciar pedido\n2 fechar o pedido\n3 exibir resultados\n4 Sair");
        let opcao = readline.question('Digite a opcao de menu escolhida: ');
        switch(opcao){
            case "1" :
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