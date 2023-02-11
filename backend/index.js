const http = require('http')
const url = require('url')
const socketIo = require('socket.io')
const crypto = require('crypto')

const dotEnv = require('dotenv')

const envPath = `${__dirname}/../.env`
const EN_CONNECTED = 'en-connected'

dotEnv.config({
  path: envPath
})

const PORT = process.env.PORT || 3000

function cors(response){
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  response.setHeader('Access-Control-Max-Age', 2592000);
}
function handler(request, response){
  cors(response)
  const { query: { socketId } } = url.parse(request.url, true)
  if(socketId) io.to(socketId).emit(EN_CONNECTED, crypto.randomUUID())

  response.write(`OK, socketId: ${socketId || ''}`)
  response.end()
}
const server = http.createServer(handler)
const io = socketIo(server,{
  cors: {
    origin: '*',
    credentials: false
  }
})

io.on('connect', (socket) => {
  console.log(`SocketIO connected ${socket.id}`);
})

server.listen(PORT, () =>{
  console.log(`Listening on: http://localhost:${PORT}`);
  
})
