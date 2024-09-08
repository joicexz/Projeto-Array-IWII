console.log('Favoritos armazenados:', JSON.parse(localStorage.getItem('favoritos')));


document.addEventListener('DOMContentLoaded', async function () {
    // Carregar o JSON com as receitas
    const msg = document.getElementById('msg');
    const response = await fetch('../JS/receitas.json');
    const data = await response.json();

    // Obter a lista de IDs de favoritos do localStorage
    let favoritos = JSON.parse(localStorage.getItem('favoritos'));

    favoritos = favoritos.filter(id => id !== null && id.trim() !== '');
    console.log(favoritos);


    // Obter o container onde os cards serão adicionados
    const container = document.querySelector('.receitas');

    // Função para criar um card a partir dos dados da receita
    function createCard(receita) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.setAttribute('data-id', receita.id);

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

        // Adiciona a classe 'favorited' se a receita estiver nos favoritos
        const heartIcon = card.querySelector('.heart');
        if (favoritos.includes(receita.id)) {
            heartIcon.classList.add('favorited');
        }

        // Adiciona o card ao container
        container.appendChild(card);
    }

    // Filtra as receitas que são favoritas
    const receitasFavoritas = data.receitas.filter(receita => favoritos.includes(receita.id));


    if (receitasFavoritas.length === 0) {
        msg.innerHTML = 'Nenhuma receita favoritada.';
    }

    // Itera sobre as receitas favoritas e cria os cards
    receitasFavoritas.forEach(receita => {
        createCard(receita);
    });
});

