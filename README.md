#Desafio Técnico Backend Estágio

[TOC]

###Objetivo

Criar uma API RPC para facilitar o gerenciamento de uma fila de pessoas

###Tecnologias usadas

-Noje.js
-Express
-Atlas Mongo DB
-Mongoose

###Referências usadas

[Construindo uma API com Node.js](https://woliveiras.com.br/posts/construindo-uma-api-com-node-js-parte-1-criando-e-listando-dados/)

[Queue Project](https://github.com/rafaumlemos/queueproject)

###Endpoints da API

-   `/createUser` - Cadastra usuário;
-   `/showUser` - Mostra todos os usuários cadastrados no banco;
-   `/addToLine` - Coloca um usuário na última posição da fila;
-   `/findPosition` - Retorna a posição de um usuário a partir de seu email;
-   `/showLine` - Lista os usuários da fila e suas respectivas posições;
-   `/filterLine` - Lista os usuários filtrados a partir de um parâmetro;
-   `/popLine` - Tira a pessoa na primeira posição da fila;
-   `/deleteUser` - Tira a pessoa na primeira posição do banco de dados;

###Exemplos de requisições

Método: POST

URL: http://localhost:3000/createUser

Body:

{
"nome": "nomedousuario",
"email": "email@usuario.com",
"genero": "generodousuario"
}

Método: GET

URL: http://localhost:3000/showUSer

Método: POST

URL: http://localhost:3000/addToLine
Body

{
"id": iddousuario
}

Método: POST

URL: http://localhost:3000/findPosition

{
"email": "email@usuario.com"
}

Método: GET

URL: http://localhost:3000/showLine

Método: POST

URL: http://localhost:3000/filterLine

{
"genero": "generodousuario"
}

Método: POST

URL: http://localhost:3000/popLine

Método: POST

URL: http://localhost:3000/deleteUser

**Autora | Author**
Foto | Nome | GitHub | Likedin | E-mail
---- | ---- | ------ | ------- | ------
<img src="./img/perfil.png" width="100px"> | Liz Vidotti | [Liz Vidotti](https://github.com/lizvidotti91) | [Linkedin](https://www.linkedin.com/in/elisetevidotti/) | liz.vidotti@gmail.com
