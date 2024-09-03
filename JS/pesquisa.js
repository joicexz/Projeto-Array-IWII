// pesquisa.js

// Carregar receitas do arquivo JSON quando a página é carregada
document.addEventListener('DOMContentLoaded', function () {
    fetch('../JS/receitas.json')
        .then(response => response.json())
        .then(data => {
            const receitas = data.receitas;
            const inputPesquisa = document.querySelector('.pesquisa-card input');
            const resultadosDiv = document.getElementById('receitas-encontradas');

            // Filtrar receitas com base na pesquisa
            inputPesquisa.addEventListener('input', function () {
                const termoPesquisa = inputPesquisa.value.toLowerCase();
                console.log(termoPesquisa);

                resultadosDiv.innerHTML = ''; // Limpar resultados anteriores

                const receitasFiltradas = receitas.filter(receita =>
                    receita.nome.toLowerCase().includes(termoPesquisa)
                );

                // Exibir receitas filtradas
                receitasFiltradas.forEach(receita => {
                    const card = document.createElement('div');
                    card.classList.add('card');
                    card.setAttribute('data-id', receita.id); // Adicione o data-id para que updateHeartIcons funcione

                    card.innerHTML = `
                        <div class="foto">
                            <img src="${receita.imagem}" alt="${receita.nome}">
                        </div>
                        <div class="receita">${receita.nome}</div>
                        <div class="outro">
                            <div class="time">
                                <i class='bx bxs-time'></i>
                                <span>${receita.tempo}</span>
                            </div>
                            <div class="porcoes">
                                <i class='bx bxs-dish'></i>
                                <span>${receita.porcoes}</span>
                            </div>
                            <div class="like">
                                <i class='bx bxs-heart heart' 
                                onclick="toggleFavorite(this)"></i>
                            </div>
                        </div>
                    `;

                    resultadosDiv.appendChild(card);
                });

                // Caso não encontre receitas correspondentes, exibe uma mensagem
                if (receitasFiltradas.length === 0) {
                    resultadosDiv.innerHTML = '<p>Nenhuma receita encontrada.</p>';
                }

                // Atualize o estado dos ícones de coração
                updateHeartIcons(); // Chamar a função para garantir que os ícones de coração sejam atualizados
            });

            // Atualize o estado dos ícones de coração ao carregar as receitas
            updateHeartIcons();
        })
        .catch(error => console.error('Erro ao carregar receitas:', error));
});


//PESQUISA POR FILTRO
document.addEventListener('DOMContentLoaded', () => {
    // Captura o parâmetro de categoria da URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');

    // Carregar e filtrar as receitas com base na categoria
    fetch('../JS/receitas.json')
        .then(response => response.json())
        .then(data => {
            const receitas = data.receitas;
            const receitasFiltradas = receitas.filter(receita => receita.categoria === categoria);

            // Função para exibir receitas filtradas na página
            exibirReceitas(receitasFiltradas);
            console.log(receitasFiltradas);

        })
        .catch(error => console.error('Erro ao carregar receitas:', error));
});

// Exibir receitas com base na categoria
function exibirReceitas(receitas) {
    const container = document.getElementById('receitas-encontradas'); // Seção onde as receitas serão exibidas
    container.innerHTML = ''; // Limpa a seção antes de adicionar novas receitas

    if (receitas.length === 0) {
        container.innerHTML = '<p>Nenhuma receita encontrada.</p>';
    }

    receitas.forEach(receita => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', receita.id); // Adicione o data-id para que updateHeartIcons funcione

        card.innerHTML = `
            <div class="foto"><img src="${receita.imagem}" alt="${receita.nome}"></div>
            <div class="receita">${receita.nome}</div>
            <div class="outro">
                <div class="time"><i class='bx bxs-time'></i><span>${receita.tempo}</span></div>
                <div class="porcoes"><i class='bx bxs-dish'></i><span>${receita.porcoes}</span></div>
                <div class="like"><i class='bx bxs-heart heart' onclick="toggleFavorite(this)"></i></div>
            </div>
        `;
        container.appendChild(card);
    });

    // Atualize o estado dos ícones de coração após exibir as receitas
    updateHeartIcons();
}

