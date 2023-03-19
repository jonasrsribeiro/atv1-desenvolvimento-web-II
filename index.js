const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))

app.listen(3000)

app.get('/', function(req, res) {
    res.render('indexPrincipal')
})

app.get('/faixa-etaria', function(req,res){
    res.render('indexFaixaEtaria')
})

app.post('/faixa-etaria', function(req,res){
    const idade = req.body.idade;
    let faixaEtaria = ''

    if (idade >= 0 && idade < 15) {
        faixaEtaria = 'Criança'
      } else if (idade >= 15 && idade < 30) {
        faixaEtaria = 'Jovem'
      } else if (idade >= 30 && idade < 60) {
        faixaEtaria = 'Adulto'
      } else{
        faixaEtaria = 'Idoso'
      }

    res.render("calculoFaixaEtaria", {idade: idade, faixaEtaria})
})

app.get('/cadastro', function(req,res){
    res.render("indexCadastro")
})

app.post('/cadastro', (req, res) => {
    const nomeUsuarioCadastro = req.body.nome
    const sobrenomeUsuarioCadastro = req.body.sobrenome
    const emailUsuarioCadastro = req.body.email
    const idadeUsuarioCadastro = req.body.idade
    const nacionalidadeUsuarioCadastro = req.body.nacionalidade
    
    res.render('cadastroCompleto', {nome: nomeUsuarioCadastro, sobrenome: sobrenomeUsuarioCadastro, email: emailUsuarioCadastro, idade: idadeUsuarioCadastro, nacionalidade: nacionalidadeUsuarioCadastro})
    
})

app.get('/notas', function(req, res){
    res.render('indexNotas')
})

app.post('/notas', (req, res) => {
    const notaAtividadeLaboratorio = parseFloat(req.body.nota_atv_pratica)
    const notaProvaSemestre = parseFloat(req.body.nota_prova_semestre)
    const notaTrabalhoTeorico = parseFloat(req.body.nota_trabalho_teorico)
    let classificacaoFinal = ''

    const mediaFinal = (((notaAtividadeLaboratorio * 2) + (notaProvaSemestre * 5) + (notaTrabalhoTeorico * 3)) / 10)

    if (mediaFinal >= 0 && mediaFinal <= 5){
        classificacaoFinal = 'F'
    } else if (mediaFinal > 5 && mediaFinal <= 6){
        classificacaoFinal = 'E'
    } else if (mediaFinal > 6 && mediaFinal <= 7){
        classificacaoFinal = 'D'
    } else if (mediaFinal > 7 && mediaFinal <= 8){
        classificacaoFinal = 'C'
    } else if (mediaFinal > 8 && mediaFinal <= 9){
        classificacaoFinal = 'B'
    } else{
        classificacaoFinal = 'A'
    }

    res.render('calculoNotas', {mediaFinal: mediaFinal, classificacaoFinal: classificacaoFinal})
})