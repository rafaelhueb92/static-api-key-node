const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

let checkApiKey = (req, res, next) => {
    if (req.headers.authorization !== process.env.API_KEY) {
      return res.status(401).json({status: 'api key inválida'});
    }
    next();
  };
  
  app.all('/api/*', checkApiKey);
  
  app.get('/api/auth', (req, res) => {
    return res.json({status: 'ok', message: 'Authenticated!'});
  });

const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});