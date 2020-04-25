const express = require('express');
const cors = require('cors'); // controle de acesso a aplicação
const routes = require('./routes'); // gerenciador de rotas https
const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//conexão com servidor
app.listen(3333, () =>{
    return console.log("servidor is running...")
});