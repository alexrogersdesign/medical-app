import express, { RequestHandler } from 'express';
import cors from 'cors'; 
import diagnosisRouter from './routes/diagnosisRouter';
import patientRouter from './routes/patientRouter';

import debug from "debug"; 
debug.debug('backend:server');
import http from "http";
import * as path from 'path';



const app = express();
// app.use(cors);
app.use(express.json() as RequestHandler);

const allowedOrigins = ['http://localhost:3000'];
const options: cors.CorsOptions = {
  origin: allowedOrigins
}; 

app.use(cors(options)); 

// app.use('/',express.static("/build/index.html") as RequestHandler)
app.use(express.static(path.join(__dirname, "../build" )));
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../build" , "index.html"));
 });
function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error: { syscall: string; code: any; }) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  if (addr) {
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
  }
}

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

let server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);


app.use('/api/diagnosis', diagnosisRouter);
app.use('/api/patients', patientRouter);

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// function normalizePort(arg0: string) {
//   throw new Error('Function not implemented.');
// }
