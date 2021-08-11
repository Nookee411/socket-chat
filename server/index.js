const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const { Server } = require('socket.io');
const registerMessageHandlers = require('./handlers/message');
const registerUserHandlers = require('./handlers/users');
const knexfile = require('./db/knexfile');
const Knex = require('knex')(knexfile.development);
const { Model } = require('objection');

Model.knex(Knex);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('user connected');
  registerMessageHandlers(socket, io);
  registerUserHandlers(socket, io);
});

io.listen(3456, () => {
  console.log('listening on 3456');
});
