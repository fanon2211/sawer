const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let mes;
let clients = [];

function eventsHandler(request, response, next) {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(mes)}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response
  };

  clients.push(newClient);

  request.on('close', () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter(client => client.id !== clientId);
  });
}

app.get('/events', eventsHandler);


function updatedonatur(mes) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(mes)}\n\n`))
  }
  function sendEventsToAll(newmes) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(newmes)}\n\n`))
  }
  async function updatedonatur(request, response, next) {
    const newmes = request.body;
    response.json(newmes)
    return sendEventsToAll(newmes);
  }
  
  app.post('/', updatedonatur);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })