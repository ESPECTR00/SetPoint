const express = require('express');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos da pasta 'public'

// Rota inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/public/HTML/Cad-Log/cadastro.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/Cad-Log/cadastro.html'));
});

app.get('/public/HTML/Cad-Log/carregamento.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/Cad-Log/carregamento.html'));
});

app.get('/public/HTML/Cad-Log/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/Cad-Log/login.html'));
});

app.get('/public/HTML/TelaInicio/TelaInicial-BR.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/TelaInicio/TelaInicial-BR.html'));
});

app.get('/public/HTML/TelaInicio/TelaInicial-JP.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/TelaInicio/TelaInicial-JP.html'));
});

app.get('/public/HTML/TelaRegras/regra.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/TelaRegras/regra.html'));
});

app.get('/public/HTML/Peneiras/TeladePeneirasSP.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/Peneiras/TeladePeneirasSP.html'));
});

app.get('/public/HTML/Peneiras/TimesPeneira/PeneiraVoleiRenataSP.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/Peneiras/TimesPeneira/PeneiraVoleiRenataSP.html'));
});

app.get('/public/HTML/TelaPerfil/telaperfil.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/TelaPerfil/telaperfil.html'));
});

app.get('/public/HTML/TelaInicio/Noticias/NoticiaBr/noticia1.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/TelaInicio/Noticias/NoticiaBr/noticia1.html'));
});

app.get('/public/HTML/TelaInicio/Noticias/NoticiaBr/noticia2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/TelaInicio/Noticias/NoticiaBr/noticia2.html'));
});

app.get('/public/HTML/TelaInicio/Noticias/NoticiaBr/noticia3.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/TelaInicio/Noticias/NoticiaBr/noticia3.html'));
});

app.get('/public/HTML/TelaInicio/Noticias/NoticiaJp/noticia1.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/TelaInicio/Noticias/NoticiaJp/noticia1.html'));
});

app.get('/public/HTML/TelaInicio/Noticias/NoticiaJp/noticia2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/TelaInicio/Noticias/NoticiaJp/noticia2.html'));
});

app.get('/public/HTML/TelaInicio/Noticias/NoticiaJp/noticia3.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/TelaInicio/Noticias/NoticiaJp/noticia3.html'));
});

app.get('/public/HTML/Times/TimesFEM/Sesi-Bauru-FEM.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/Times/TimesFEM/Sesi-Bauru-FEM.html'));
});

app.get('/public/HTML/Times/TimesMASC/Sesi-Bauru-MASC.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/Times/TimesMASC/Sesi-Bauru-MASC.html'));
});

app.get('/public/HTML/Calendario/calendario.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/Calendario/calendario.html'));
});

app.get('/public/HTML/Calendario/calendarioSUPERLIGAfem.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/Calendario/calendarioSUPERLIGAfem.html'));
});

app.get('/public/HTML/Calendario/calendarioSUPERLIGAmasc.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/Calendario/calendarioSUPERLIGAmasc.html'));
});

app.get('/public/HTML/Calendario/calendarioSUPERLIGAmascDIA2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/Calendario/calendarioSUPERLIGAmascDIA2.html'));
});

app.get('/public/HTML/Tela-de-espera-de-ligas.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/Tela-de-espera-de-ligas.html'));
});
// Cadastro de usuários
app.post('/api/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
    if (usuarioExistente) {
        return res.status(400).json({ error: 'Email já cadastrado' });
    }

    const hashedSenha = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
        data: { nome, email, senha: hashedSenha },
    });

    res.json({ message: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
});

// Rota de login
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        return res.status(400).json({ error: 'Usuário ou senha inválidos' });
    }

    res.json({ message: 'Login bem-sucedido' });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
