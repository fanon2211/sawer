const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { json } = require('body-parser')
const port = 3000
const cors = require("cors");
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io')

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(express.json())

app.post('/', function(request, response) {
  console.log(request.body)
})

app.get('/', function(request, response) {
}) 




io.on('connection', (socket) => {
  console.log('a user connected');
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})