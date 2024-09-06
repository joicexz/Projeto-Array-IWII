// Captura o ID da receita da URL
const urlParams = new URLSearchParams(window.location.search);
const receitaId = urlParams.get('id');

// Função para carregar os detalhes da receita com base no ID
function carregarDetalhesReceita(id) {
    fetch('../JS/receitas.json')
        .then(response => response.json())
        .then(data => {
            const receita = data.receitas.find(receita => receita.id === id);

            if (receita) {
                document.getElementById('nome-receita').textContent = receita.nome.toUpperCase();
                document.getElementById('imagem-receita').src = receita.imagem;                
                document.getElementById('imagem-receita').alt = receita.nome;
                document.getElementById('descricao-receita').textContent = receita.descricao;
                document.getElementById('tempo').textContent = receita.tempo;
                document.getElementById('porcao').textContent = receita.porcoes;

                // Exibir os ingredientes
                const ingredientesContainer = document.querySelector('.container-ingredientes ul');
                ingredientesContainer.innerHTML = ''; // Limpa os ingredientes anteriores
                console.log(ingredientesContainer);
                
                receita.Ingredientes.forEach(ingrediente => {
                    const li = document.createElement('li');
                    li.textContent = ingrediente;
                    ingredientesContainer.appendChild(li);
                });

                // Exibir o modo de preparo
                const preparoContainer = document.querySelector('.preparo ol');
                preparoContainer.innerHTML = ''; // Limpa o modo de preparo anterior
                receita.modoDePreparo.forEach(passo => {
                    const li = document.createElement('li');
                    li.textContent = passo;
                    preparoContainer.appendChild(li);
                });

            } else {
                document.querySelector('.container').innerHTML = '<p>Receita não encontrada.</p>';
            }
        })
        .catch(error => console.error('Erro ao carregar detalhes da receita:', error));
}

// Carregar os detalhes da receita ao carregar a página
carregarDetalhesReceita(receitaId);
