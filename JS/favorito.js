console.log('Favoritos armazenados:', JSON.parse(localStorage.getItem('favoritos')));

document.addEventListener('DOMContentLoaded', async function () {
    // carrega o arquivo receitas.json
    const msg = document.getElementById('msg');
    const response = await fetch('../JS/receitas.json');
    const data = await response.json();

    //pega a lista de IDs de favoritos do localStorage
    let favoritos = JSON.parse(localStorage.getItem('favoritos'));

    favoritos = favoritos.filter(id => id !== null && id.trim() !== '');
    console.log(favoritos);

    // pega o container onde os cards serão adicionados
    const container = document.querySelector('.receitas');

    // FUNÇÃO PARA CRIAR UM CARD A PARTIR DOS DADOS DA RECEITA
    function createCard(receita) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', receita.id);

        // estrutura do card
        card.innerHTML = `
            <div class="foto" onclick="mostrarDetalhe(this)">
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

        // adiciona a classe 'favorited' se a receita estiver nos favoritos
        const heartIcon = card.querySelector('.heart');
        if (favoritos.includes(receita.id)) {
            heartIcon.classList.add('favorited');
        }

        // adiciona o card ao container
        container.appendChild(card);
    }

    // filtra as receitas que são favoritas
    const receitasFavoritas = data.receitas.filter(receita => favoritos.includes(receita.id));

    if (receitasFavoritas.length === 0) {
        msg.innerHTML = 'Nenhuma receita favoritada.';
    }

    // cria o card para cada receita
    receitasFavoritas.forEach(receita => {
        createCard(receita);
    });
});

