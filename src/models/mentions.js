// Chamando o mongoose
const mongoose = require("mongoose");

// Instanciando o Schema para inserir e visulizar os dados do banco
const Schema = mongoose.Schema;

// Modelo do Schema e exportar o modelo
const schema = new Schema({
    id: {
        type: Number,
    },
    nome: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
    },
    genero: {
        type: String,
        required: true,
    },
    posicao: {
        type: Number,
    },
});

module.exports = mongoose.model("Mentions", schema);
