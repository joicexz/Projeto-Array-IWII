document.getElementById('form-receita').addEventListener('submit', function (e) {
    e.preventDefault();

    console.log('click');


    // Captura os valores do formulário
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;

    // // Captura os ingredientes da lista
    // const ingredientes = Array.from(document.querySelectorAll('#listaIngredientes li'))
    //                          .map(li => li.textContent);

    const preparo = document.getElementById('preparo').value;
    const tempo = document.getElementById('tempo').value;
    const porcao = document.getElementById('porcao').value;
    const categoria = document.querySelector('input[name="categoria"]:checked')?.value;

    // Cria um objeto com os dados da receita
    const novaReceita = {
        nome: nome,
        descricao: descricao,
        // Ingredientes: ingredientes,
        modoDePreparo: preparo,
        tempo: tempo,
        porcoes: porcao,
        categoria: categoria
    };

    console.log(novaReceita);
  
    // Envia os dados para o servidor
    // fetch('receitas.json', { 
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(novaReceita)
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Receita adicionada com sucesso:', data);
    //     alert('Receita adicionada com sucesso!');
    // })
    // .catch((error) => {
    //     console.error('Erro ao adicionar a receita:', error);
    // });
});

