const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const port = 3009;
const contatosFilePath = path.join(__dirname, 'contatos.json');

const server = http.createServer((req, res) => {
    // Lógica para lidar com requisições GET
    if (req.method === 'GET') {
        let filePath = '';
        let statusCode = 200;

        // Define o caminho do arquivo com base na URL
        switch (req.url) {
            case '/':
                filePath = path.join(__dirname, 'views', 'index.html');
                break;
            case '/servico':
                filePath = path.join(__dirname, 'views', 'servico.html');
                break;
            case '/contato':
                filePath = path.join(__dirname, 'views', 'contato.html');
                break;
            case '/orcamentos':
                // Redirecionamento para a rota /contato com status 301
                res.writeHead(301, { 'Location': '/contato' });
                res.end();
                return;
            default:
                // Se a URL não corresponder a uma rota, tenta carregar a página de erro
                filePath = path.join(__dirname, 'views', 'paginadeerro.html');
                statusCode = 404;
                break;
        }

        // Lê o arquivo do caminho definido
        fs.readFile(filePath, (err, data) => {
            if (err) {
                // Se houver erro na leitura (ex: arquivo não existe), mostra um erro 500
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro interno do servidor: Arquivo não encontrado.');
            } else {
                // Se o arquivo for lido com sucesso, envia a resposta
                res.writeHead(statusCode, { 'Content-Type': 'text/html' });
                res.end(data);
            }
        });
    } 
    // Lógica para lidar com requisições POST
    else if (req.method === 'POST') {
        if (req.url === '/submit-contact') {
            let body = '';
            
            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const formData = querystring.parse(body);

                fs.readFile(contatosFilePath, (err, data) => {
                    let contatos = [];
                    if (!err) {
                        try {
                            contatos = JSON.parse(data);
                        } catch (e) {
                            console.error('Erro ao ler JSON, criando um novo arquivo...');
                        }
                    }

                    contatos.push(formData);

                    fs.writeFile(contatosFilePath, JSON.stringify(contatos, null, 2), err => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Erro ao salvar o contato.');
                        } else {
                            res.writeHead(200, { 'Content-Type': 'text/plain' });
                            res.end('Obrigado pelo seu contato! Dados salvos com sucesso.');
                        }
                    });
                });
            });
        }
    }
});

server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}/`);
});