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
                // Exiba outros detalhes como ingredientes, modo de preparo, etc.
            } else {
                document.getElementById('detalhes-receita').innerHTML = '<p>Receita não encontrada.</p>';
            }
        })
        .catch(error => console.error('Erro ao carregar detalhes da receita:', error));
}

// Carregar os detalhes da receita ao carregar a página
carregarDetalhesReceita(receitaId);