const express = require('express');
const fs = require('fs').promises; // Usando a versão de Promises do 'fs' para async/await
const os = require('os');
const path = require('path');

// Define o caminho do arquivo de contatos de forma inteligente:
// - Na Vercel, usa o diretório /tmp (o único que permite escrita).
// - Localmente, salva o arquivo na raiz do projeto para fácil acesso.
const contatosFilePath = process.env.VERCEL ? path.join('/tmp', 'contatos.json') : path.join(__dirname, 'contatos.json');

// Inicializa o aplicativo Express
const app = express();

// Middlewares para o Express entender os dados do formulário (JSON e URL-encoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Para desenvolvimento local, vamos servir os arquivos com base na sua estrutura.
if (process.env.NODE_ENV !== 'production') {
    // 1. Serve arquivos como style.css e script.js da pasta raiz do projeto.
    app.use(express.static(__dirname));

    // 2. Define rotas explícitas para servir os arquivos HTML da pasta raiz.
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    });
    app.get('/servico', (req, res) => {
        res.sendFile(path.join(__dirname, 'servico.html'));
    });
    app.get('/contato', (req, res) => {
        res.sendFile(path.join(__dirname, 'contato.html'));
    });
}

// Criamos um roteador para a API para que possamos usar o prefixo /api localmente,
// imitando a configuração do vercel.json.
const apiRouter = express.Router();
apiRouter.post('/submit-contact', async (req, res) => {
    // O Express já processa o corpo da requisição para nós
    const formData = req.body;

    // Validação simples para garantir que os dados essenciais foram enviados
    if (!formData.name || !formData.email || !formData.message) {
        return res.status(400).send('Erro: Nome, email e mensagem são obrigatórios.');
    }

    try {
        let contatos = [];
        try {
            // Tenta ler o arquivo de contatos existente
            const data = await fs.readFile(contatosFilePath, 'utf8');
            contatos = JSON.parse(data);
        } catch (error) {
            // Se o arquivo não existir (error.code === 'ENOENT'), ignora o erro e começa com um array vazio.
            // Isso é esperado na primeira vez que a função é executada.
            if (error.code !== 'ENOENT') {
                console.error('Erro ao ler ou parsear contatos.json:', error);
            }
        }

        // Adiciona o novo contato ao array
        contatos.push(formData);

        // Salva o array atualizado de volta no arquivo
        await fs.writeFile(contatosFilePath, JSON.stringify(contatos, null, 2));

        res.status(200).send('Obrigado pelo seu contato! Dados salvos com sucesso.');
    } catch (error) {
        console.error('Erro ao salvar o contato:', error);
        res.status(500).send('Erro interno do servidor ao salvar o contato.');
    }
});

// Diz ao app principal para usar nosso roteador de API com o prefixo /api
app.use('/api', apiRouter);

// Exporta o app para que a Vercel possa usá-lo
module.exports = app;

// O bloco abaixo só será executado quando rodarmos o arquivo diretamente com `node servidor.js`
// Ele não será executado na Vercel.
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando! Acesse http://localhost:${PORT}`);
        console.log(`O arquivo de contatos será salvo em: ${contatosFilePath}`);
    });
}
