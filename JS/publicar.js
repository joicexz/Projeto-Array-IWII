import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyAI8sxnjZOaoZBLinp7Ab8dI1ZF9TqN2eU",
    authDomain: "memorias-culinarias.firebaseapp.com",
    projectId: "memorias-culinarias",
    storageBucket: "memorias-culinarias.appspot.com",
    messagingSenderId: "258479456651",
    appId: "1:258479456651:web:4df53aa2e765505327af8e",
    measurementId: "G-CFXJV7BFWM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Função para lidar com o upload da imagem
document.getElementById('uploadImagem').addEventListener('change', async function (event) {
    const file = event.target.files[0];
    if (file) {
        const storageRef = ref(storage, 'images/' + file.name);
        try {
            // Faz o upload da imagem
            await uploadBytes(storageRef, file);

            // Obtém a URL de download
            const url = await getDownloadURL(storageRef);
            const imgElement = document.getElementById('imagemPreview');

            imgElement.src = url;  // Define a URL da imagem como o src
            imgElement.style.display = 'block';  // Exibe a imagem
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
        }
    }
});

// Referências aos elementos
const container_ingredientes = document.querySelector('.ingredientes-container');
const ingredienteInput = document.getElementById('ingredienteInput');
const adicionarIngredienteBtn = document.getElementById('adicionarIngredienteBtn');
const listaIngredientes = document.getElementById('listaIngredientes');

// Evento de clique no botão "Adicionar Ingrediente"
adicionarIngredienteBtn.addEventListener('click', function () {
    const ingrediente = ingredienteInput.value.trim();  // Remove espaços em branco

    if (ingrediente !== '') {
        // Cria um novo item de lista (li)
        const li = document.createElement('li');

        // Adiciona o texto do ingrediente dentro de um <span>
        const span = document.createElement('span');
        span.textContent = ingrediente;
        li.appendChild(span);  // Adiciona o <span> ao <li>

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
        const idString = ultimoId + 1;
        console.log(idString.toString());

        return idString.toString();  // Retorna o próximo ID
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

    // Captura apenas o texto do <span> dentro de cada <li>
    const ingredientes = Array.from(document.querySelectorAll('#listaIngredientes li span')).map(span => span.textContent);

    const imagemUrl = document.getElementById('imagemPreview').src;

    // Obter o próximo ID disponível
    const novoId = await getNextId();

    const novaReceita = {
        id: novoId,  // Define o novo ID incrementado
        nome: nome,
        imagem: imagemUrl,
        descricao: descricao,
        ingredientes: ingredientes,
        modoDePreparo: preparo,
        tempo: tempo,
        porcoes: porcao,
        categoria: categoria
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

