const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

// Middleware para analisar dados JSON
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public'))); // Coloque seus arquivos HTML, CSS, JS em 'public'

// Rota para adicionar uma nova receita
app.post('/adicionar-receita', (req, res) => {
    const novaReceita = req.body;

    // Lê o arquivo JSON existente
    const filePath = path.join(__dirname, 'JS/receitas.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo JSON:', err);
            return res.status(500).send('Erro ao ler o arquivo JSON.');
        }

        // Converte o JSON existente para um objeto JavaScript
        let receitas = JSON.parse(data);

        // Adiciona a nova receita ao array existente
        novaReceita.id = (receitas.receitas.length + 1).toString();  // Adiciona um novo ID
        receitas.receitas.push(novaReceita);

        // Converte o objeto de volta para JSON e grava no arquivo
        fs.writeFile(filePath, JSON.stringify(receitas, null, 4), (err) => {
            if (err) {
                console.error('Erro ao gravar no arquivo JSON:', err);
                return res.status(500).send('Erro ao gravar no arquivo JSON.');
            }

            console.log('Receita adicionada com sucesso!');
            res.status(200).send('Receita adicionada com sucesso!');
        });
    });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
