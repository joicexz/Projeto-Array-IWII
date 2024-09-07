document.getElementById('uploadImagem').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        // Quando o carregamento da imagem for concluído
        reader.onload = function (e) {
            const imgElement = document.getElementById('imagemPreview');
            imgElement.src = e.target.result;  // Defina a fonte da imagem como a string base64
            imgElement.style.display = 'block';  // Exibe a imagem
        };

        // Leia o conteúdo do arquivo de imagem
        reader.readAsDataURL(file);
    }
});

// Referências aos elementos
const ingredienteInput = document.getElementById('ingredienteInput');
const adicionarIngredienteBtn = document.getElementById('adicionarIngredienteBtn');
const listaIngredientes = document.getElementById('listaIngredientes');

// Evento de clique no botão "Adicionar Ingrediente"
adicionarIngredienteBtn.addEventListener('click', function () {
    const ingrediente = ingredienteInput.value.trim();  // Remove espaços em branco

    if (ingrediente !== '') {
        // Cria um novo item de lista (li)
        const li = document.createElement('li');
        li.textContent = ingrediente;

        // Botão para remover o ingrediente
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remover';
        removeBtn.style.marginLeft = '10px';
        removeBtn.style.padding = '5px';
        removeBtn.style.backgroundColor = '#ec08088f';
        removeBtn.style.color = '#fff';
        removeBtn.style.border = 'none';
        removeBtn.style.borderRadius = '5px';
        removeBtn.style.cursor = 'pointer';

        removeBtn.addEventListener('click', function () {
            listaIngredientes.removeChild(li);
        });

        li.appendChild(removeBtn);  // Adiciona o botão de remover ao li
        listaIngredientes.appendChild(li);  // Adiciona o li à lista

        // Limpa o campo de input após adicionar o ingrediente
        ingredienteInput.value = '';
    }
});

// Função para obter o próximo ID
async function getNextId() {
    try {
        const response = await fetch('../JS/receitas.json');
        const data = await response.json();

        // Encontrar o maior ID atual
        const ultimoId = data.receitas.length;
        console.log(ultimoId);

        return ultimoId + 1  // Retorna o próximo ID
    } catch (error) {
        console.error('Erro ao carregar receitas:', error);
    }
}

document.getElementById('form-receita').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const preparo = document.getElementById('preparo').value;
    const tempo = document.getElementById('tempo').value;
    const porcao = document.getElementById('porcao').value;
    const categoria = document.querySelector('input[name="categoria"]:checked')?.value;
    const ingredientes = Array.from(document.querySelectorAll('#listaIngredientes li')).map(li => li.textContent);

    // Obter o próximo ID disponível
    const novoId = await getNextId();

    const novaReceita = {
        id: novoId,  // Define o novo ID incrementado
        nome: nome,
        // imagem: imagem,
        descricao: descricao,
        ingredientes: ingredientes,
        modoDePreparo: preparo,
        tempo: tempo,
        porcoes: porcao,
        categoria: categoria,
        favorito: "nao"  // Valor padrão
    };

    fetch('http://localhost:3000/add-receita', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novaReceita)
    })
        .then(response => response.text())
        .then(data => {
            alert(data);
        })
        .catch((error) => {
            console.error('Erro ao adicionar a receita:', error);
        });
});
