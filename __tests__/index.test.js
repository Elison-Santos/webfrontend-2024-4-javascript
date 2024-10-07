const {
    adicionarPedido,
    selecionarMesa,
} = require("../src/index.js");
const readline = require('readline-sync');
let pedidosRestaurante;

//mockar o método 'questionInt' 
jest.mock('readline-sync', () => ({
    questionInt : jest.fn()
}));

//dessa forma eu começo o teste
test("Adicionar pedido corretamente", () => {
        
    readline.questionInt.mockReturnValueOnce(4);
    readline.questionInt.mockReturnValueOnce(4); // Simula a resposta do número de pessoas
    
    pedidosRestaurante = adicionarPedido();
    expect(pedidosRestaurante.pedidos).toEqual([{
        numeroDaMesa:4,
        numeroDePessoas:4
    }]);
})


test("Percorrer obj", () =>{
    
    expect(pedidosRestaurante.pedidos.length).toBe(1);
})

