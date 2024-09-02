// localStorage.clear();

function toggleFavorite(element) {

    const card = element.closest('.card');
    const idNome = card.getAttribute('data-id');

    element.classList.toggle('favorited');

    // Obtém a lista atual de favoritos do localStorage
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    console.log(favoritos);
    

    if (element.classList.contains('favorited')) {
        // Adiciona o ID à lista de favoritos se não estiver presente
        if (!favoritos.includes(idNome)) {
            favoritos.push(idNome);
            console.log('Adicionado aos favoritos!');
        }
    } else {
        // Remove o ID da lista de favoritos se estiver presente
        favoritos = favoritos.filter(favId => favId !== idNome);
        console.log('Removido aos favoritos!');
    }

    // Salva a lista atualizada de favoritos no localStorage
    localStorage.setItem('favoritos', JSON.stringify(favoritos));

}

function updateHeartIcons() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    // Encontra todos os ícones de coração na página
    const hearts = document.querySelectorAll('.heart');

    hearts.forEach(heart => {
        const card = heart.closest('.card');
        const id = card.getAttribute('data-id');

        if (favoritos.includes(id)) {
            heart.classList.add('favorited');
            // heart.style.color = '#910b0b'; // Ou qualquer outra cor que represente o estado favorito
        } else {
            heart.classList.remove('favorited');
            // heart.style.color = ''; // Ou a cor padrão
        }
    });
}

// Atualiza o estado dos corações ao carregar a página
document.addEventListener('DOMContentLoaded', updateHeartIcons);

