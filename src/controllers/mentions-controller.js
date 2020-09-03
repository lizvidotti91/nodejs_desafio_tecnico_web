// Importando o mongoose
const mongoose = require("mongoose");
const { query } = require("express");

// Importando o modelo para cadastro do usuário
const Mentions = mongoose.model("Mentions");

// A função createUser recebe nome, email e gênero do usuário e retorna id, nome, email e gênero cadastrados
exports.createUser = async (req, res) => {
    try {
        const mention = new Mentions({
            id: (Math.random() * 10000) | 0,
            nome: req.body.nome,
            email: req.body.email,
            genero: req.body.genero,
            posicao: 0,
        });

        const user = {
            id: mention.id,
            nome: mention.nome,
            email: mention.email,
            genero: mention.genero,
        };

        res.send(user);
    } catch (e) {
        res.status(500).send({ message: "Falha ao cadastrar o usuário" });
    }
};

// Mostra todos os usuários cadastrados no banco (Atlas Mongo DB)
exports.showUser = async (req, res) => {
    try {
        const data = await Mentions.find(
            {},
            "id nome email genero posicao -_id"
        );
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ message: "Falha ao carregar usuários!" });
    }
};

// A função addToLine recebe o ID do usuário a ser adicionado à fila e retorna a posição em que este usuário está na fila
const Queue = [];
var fila = 1;

exports.addToLine = async (req, res) => {
    try {
        const ID = await Mentions.findOne(
            { id: req.body.id },
            "id nome email genero posicao -_id"
        );

        ID.posicao = fila;
        Queue.push(ID); // guarda a lista dos usuários na fila

        var show = {
            nome: ID.nome,
            posicao: ID.posicao,
        }; // usada para mostrar nome e posição do usuário cadastrado na fila

        fila++;
        res.status(200).send(show);
    } catch (e) {
        res.status(500).send({ message: "Falha ao adicionar usuário na fila" });
    }
};

// A função findPosition encontra a posição, através do email, do usuário na fila. Ele retorna apenas o número (1 <<primeira posição da fila>>)
exports.findPosition = async (req, res) => {
    try {
        Queue.forEach(myFunction);
        function myFunction(item) {
            if (item.email == req.body.email) {
                var show = {
                    nome: item.nome,
                    posicao: item.posicao,
                };
                res.send(show);
            }
        }
    } catch (e) {
        res.status(500).send({ message: "Falha ao procurar usuário" });
    }
};

// Mostra todos os usuários cadastrados na fila e suas respectivas posições
exports.showLine = async (req, res) => {
    try {
        res.status(200).send(Queue);
    } catch (e) {
        res.status(500).send({ message: "Falha ao carregar fila!" });
    }
};

// Função para filtrar, através do gênero, quais são os usuários correspondentes a este gênero e suas posições na fila
exports.filterLine = async (req, res) => {
    const genero = [];
    try {
        Queue.forEach(myFunction);
        function myFunction(item) {
            if (item.genero == req.body.genero) {
                const reply = {
                    nome: item.nome,
                    email: item.email,
                    genero: item.genero,
                    posicao: item.posicao,
                };
                genero.push(reply);
            }
        }
        res.send(genero);
    } catch (e) {
        res.status(500).send({ message: "Falha ao procurar gênero" });
    }
};

// Deleta o primeiro usuário da fila
exports.popLine = async (req, res) => {
    try {
        const apaga = await Queue.shift(); //remove o primeiro usuário da fila

        // Para cada usuário da fila, os números de suas posições são diminuídos 1 unidade
        Queue.forEach(myFunction);
        function myFunction(item) {
            item.posicao = item.posicao - 1;
        }

        // retorna a variável apaga, que guarda o usuário removido da fila
        res.status(200).send({ removido: apaga });
    } catch (e) {
        res.status(500).send({ message: "Falha ao remover usuário" });
    }
};

// Deleta o primeiro usuário cadastrado no banco (Atlas Mongo DB)
exports.deleteUser = async (req, res) => {
    try {
        const del = await Mentions.findOneAndDelete();
        res.status(200).send({ removido: del });
    } catch (e) {
        res.status(500).send({ message: "Falha ao remover usuário" });
    }
};
