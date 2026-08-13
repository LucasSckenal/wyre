const path = require('path');
const express = require('express');
const http = require('http');
const { router: authRouter } = require('./auth');
const { router: directoryRouter } = require('./directory');
const { router: profileRouter } = require('./profile');
const { router: botsRouter } = require('./bots');
const { attachWebSocket } = require('./ws');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'data', 'uploads'), { index: false, dotfiles: 'deny' }));
app.use('/api', authRouter);
app.use('/api/guilds', directoryRouter);
app.use('/api/users', profileRouter);
app.use('/api/bots', botsRouter);

const server = http.createServer(app);
attachWebSocket(server);

server.listen(PORT, () => {
  console.log(`Servidor central rodando em http://localhost:${PORT} (REST) e ws://localhost:${PORT} (WS)`);
});
