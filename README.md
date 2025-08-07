#Meu Portfólio com Node.js
Este é um projeto de portfólio pessoal, construído do zero para demonstrar habilidades em desenvolvimento web back-end e front-end. O sistema utiliza Node.js para criar um servidor local, que hospeda páginas estáticas em HTML, além de gerenciar rotas e interações de formulários.

#Funcionalidades Principais
Servidor HTTP em Node.js: O servidor foi configurado para rodar localmente na porta 3009, gerenciando as requisições e respostas do navegador.

#Rotas Dinâmicas: Implementação de um sistema de rotas que serve diferentes páginas HTML (index.html, servico.html, contato.html).

#Redirecionamento de URL: A rota /orcamentos foi configurada para redirecionar automaticamente para a página /contato, com um status HTTP 301.

#Tratamento de Erros: Qualquer URL não mapeada é capturada e redireciona o usuário para uma página de erro personalizada (404 Not Found).

#Processamento de Formulário: A página de contato envia dados via método POST para o servidor, que processa a requisição e salva as informações em um arquivo contatos.json.

#Design Responsivo e Moderno: As páginas foram estilizadas com CSS e o framework Bootstrap para garantir uma boa experiência em qualquer dispositivo.

#Tecnologias Utilizadas

Back-end:

Node.js: Ambiente de execução JavaScript.

HTTP: Módulo nativo para criar o servidor.

File System (fs): Módulo para ler e escrever arquivos.

Path: Módulo para manipular caminhos de arquivos.

Query String: Módulo para analisar os dados do formulário.

#Front-end:

HTML5 & CSS3: Estrutura e estilo das páginas.

Bootstrap 5: Framework CSS para design responsivo.

Font Awesome: Biblioteca de ícones.

#Como Rodar o Projeto
Para visualizar e testar o projeto localmente, siga os passos abaixo:

#Clone o repositório:
git clone https://github.com/SEU_USUARIO/meu-portfolio-com-nodejs.git

#Navegue até a pasta do projeto:
cd meu-portfolio-com-nodejs

#Instale as dependências (se houver):
npm install

#Inicie o servidor:
node server.js

#Acesse o site no seu navegador em:
http://localhost:3009
