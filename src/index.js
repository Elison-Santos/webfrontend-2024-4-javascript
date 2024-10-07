// Importando a biblioteca readline-sync
const readline = require('readline-sync');
//variávei globais
const pedidosRestaurante = {
    pedidos: [],
    estoque: [],
    usuarios: []
};
let valorPorPessoa;
let contador;

// variáveis com Strings
textNumeroPessoas = 'Digite o numero de pessoas na mesa de 1 a 6: ';
textNumeroMesa = 'Digite o numero da Mesa de 1 a 15: ';
textValorTotal = 'Digite o valor total da conta: ';
textMetodoPagamento = 'Qual e o metodo de pagamento (1 - PIX, 2 - dinheiro ou  3 - cartao)? ';

//função para adicionar um pedido 
function adicionarPedido(){
    //capturando o numero da mesa
    let mesa = selecionarMesa();
    contador = 0;
    // Capturando o número de pessoas na mesa
    let numeroDePessoas = readline.questionInt(textNumeroPessoas);
    while( contador == 0){
        if(numeroDePessoas > 0 && numeroDePessoas <= 6){
            contador++;
        }else{
            console.log("numero de pessoas inválida!");
            numeroDePessoas = readline.questionInt(textNumeroPessoas);
        }
    }

    //adiciono uma numeroMesa e numeroDePessoas novo ao obj
    pedidosRestaurante.pedidos.push(
        { numeroDaMesa : mesa, numeroDePessoas: numeroDePessoas} 
    );
    console.log(pedidosRestaurante);
    return pedidosRestaurante;
}

function selecionarMesa(){
    let numeroDaMesa;
    contador = 0;
    numeroDaMesa = readline.questionInt(textNumeroMesa);

    //valido a mesa de 1 a 30 
    while( contador == 0){
        if(numeroDaMesa > 0 && numeroDaMesa <= 15){
            contador++;
        }else{
            console.log("Mesa inválida!");
            numeroDaMesa = readline.questionInt(textNumeroMesa);
        }
    }
    return numeroDaMesa;
}

function capturarTotal(){
    let mesa = selecionarMesa();
    let index = pedidosRestaurante.pedidos.findIndex(pedidos => pedidos.numeroDaMesa === mesa);
        //Capturando o valor da conta
        const valorTotal= readline.questionFloat(textValorTotal);
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
    
    pedidosRestaurante.pedidos[index].metodoDePagamento = readline.questionInt(textMetodoPagamento);
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

//função para percorrer o obj
function percorrerObj(){
    pedidosRestaurante.pedidos.forEach((pedido) =>{
        console.log(pedido);
    })
    return pedidosRestaurante.pedidos.length;
}

// Exibindo os resultados
function exibirResultados(){
    const index = pedidosRestaurante.pedidos.findIndex(pedidos => pedidos.numeroDaMesa === selecionarMesa());
    //
    console.log(`\na mesa ${pedidosRestaurante.pedidos[index].numeroDaMesa} tem ${ pedidosRestaurante.pedidos[index].numeroDePessoas} 
        pessoas, cada uma deve pagar ${valorPorPessoa.toFixed(2)} Reais, valor total de R$${pedidosRestaurante.pedidos[index].valorTotal}\n`);
}

//menu para escolha de função
function menu(){
    let finalizar = true;
    while(finalizar == true){
        console.log("~~~~~~~~~~~~~~~~~~~~ Restaurante do Elison ~~~~~~~~~~~~~~~~~~~~");
        console.log("1 iniciar pedido\n2 fechar o pedido\n3 exibir resultado\n4 sair");
        let opcao = readline.questionInt('Digite a opcao de menu escolhida: ');
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
                finalizar = false;    
        }
    }
}
menu();
console.log(JSON.stringify(pedidosRestaurante.pedidos));

module.exports = {
    adicionarPedido,
    selecionarMesa,
    percorrerObj,
   };