// Carregar receitas do arquivo JSON quando a página é carregada
document.addEventListener('DOMContentLoaded', function () {
    fetch('../receitas.json')
        .then(response => response.json())
        .then(data => {
            const receitas = data.receitas;
            const inputPesquisa = document.querySelector('.pesquisa-card input');
            const resultadosDiv = document.getElementById('receitas-encontradas');

            // Filtrar receitas com base na pesquisa
            inputPesquisa.addEventListener('input', function () {
                const termoPesquisa = inputPesquisa.value.toLowerCase();
                resultadosDiv.innerHTML = ''; // Limpar resultados anteriores

                const receitasFiltradas = receitas.filter(receita => 
                    receita.nome.toLowerCase().includes(termoPesquisa)
                );

                // Exibir receitas filtradas
                receitasFiltradas.forEach(receita => {
                    const card = document.createElement('div');
                    card.classList.add('card');

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
                                <i class='bx bxs-heart' style='color:#910b0b'></i>
                            </div>
                        </div>
                    `;

                    resultadosDiv.appendChild(card);
                });

                // Caso não encontre receitas correspondentes, exibe uma mensagem
                if (receitasFiltradas.length === 0) {
                    resultadosDiv.innerHTML = '<p>Nenhuma receita encontrada.</p>';
                }
            });
        })
        .catch(error => console.error('Erro ao carregar receitas:', error));
});
