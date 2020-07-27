Teste Técnico Prático - Gabriel de Amorim Machado

Pré Requisitos
Ambiente de desenvolvimento configurado com as seguintes ferramentas:


Node.js com gerenciador de pacote NPM: https://nodejs.org/en/download/

Caso seja o Sistema Operacional seja Ubuntu 18.04(Linux) , basta rodar os dois comandos abaixo:
$ curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
$ sudo apt-get install -y nodejs

Instalação do projeto

Com o git instalado e o terminal aberto, execute o comando abaixo, para clonar o repositório: git clone https://github.com/gabriel-amorim1/seidor.git


Pelo terminal, acesse a pasta do projeto utilizando "$ cd seidor" e execute o comando abaixo para atualizar as dependências do projeto: npm install


Iniciando servidor
Inicie a exibição da aplicação pelo servidor: npm start
Se tudo estiver certo, ao rodar npm start no terminal, deve aparecer algo como:
'> backend@1.0.0 start /home/seidor'
'> nodemon src/server.js'

Criar banco e criar as migrations
Crie o banco e as tabelas do banco com o comando: $ npx knex migrate:latest 
Se tudo estiver certo, ao rodar o comando no terminal, deve aparecer algo como:
'Using environment: development'
'Batch 1 run: 3 migrations'

Rodar testes
Para rodar os testes unitários e de integração rode o seguinte comando no terminal:
$ npm test

Para facilitar os testes deixei o arquivo "Insomnia_2020-07-26.json" na raiz do projeto que pode ser importado no aplicativo Insomnia com todas as rotas e parametros já configurados.