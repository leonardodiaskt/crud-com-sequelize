const { response } = require('express');
const express = require('express')
const Sequelize = require('sequelize');

const porta = 3036;
const app = express();

const sequelize = new Sequelize('CADASTRO', 'root', '',{
    dialect: 'mysql',
    host: 'localhost',
    port: "3306",
});

app.use(express.json())

const tabelacadastro = sequelize.define('Users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING(150),
        allowNull: false
    },
    cpf: {
        type: Sequelize.CHAR(11),
        allowNull: false
    },
    idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ni: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    cargo: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//GET

app.get('', async(req, res)=>{
    await tabelacadastro.findAll().then((response) => res.send(response))
});

//POST

async function insereDados(dado){

    sequelize.sync()
    
        .then(() =>{
            tabelacadastro.create({
                nome: dado.nome,
                cpf: dado.cpf,
                idade: dado.idade,
                ni: dado.ni,
                cargo: dado.cargo
            })
        });
}

app.post('/id', async(req, res)=>{
    insereDados(req.body)
    res.status(200).send("Usuário Adicionado")
})

//PUT

app.put('/:id', async(req, res)=>{
    const index = req.params.id;

    tabelacadastro.update(req.body, {where: {
        id: index
    }}).then((response)=>{res.send("Usuário Atualizado")})
    .catch((err) => {console.log(err)});
})

//DELETE

app.delete('/:id', async (req, res) => {
    const index = req.params.id;

    tabelacadastro.destroy({where: {
        id: index
    }}).then((response)=>{res.send("Usuário Deletado")})
    .catch((err) => {console.log(err)});
})

app.listen(porta, (req, res) =>{
   console.log("Servidor rodando na porta " + porta); 
})

module.exports = sequelize;