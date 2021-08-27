"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const diagnosisRouter_1 = __importDefault(require("./routes/diagnosisRouter"));
const patientRouter_1 = __importDefault(require("./routes/patientRouter"));
const debug_1 = __importDefault(require("debug"));
debug_1.default.debug('backend:server');
const http_1 = __importDefault(require("http"));
const path = __importStar(require("path"));
const app = express_1.default();
app.use(express_1.default.json());
const allowedOrigins = ['http://localhost:3000'];
const options = {
    origin: allowedOrigins
};
app.use(cors_1.default(options));
app.use(express_1.default.static(path.join(__dirname, "../public")));
app.get("/", (_req, res) => {
    res.sendFile(path.join(__dirname, "../public", "index.html"));
});
function normalizePort(val) {
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
function onError(error) {
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
        debug_1.default('Listening on ' + bind);
    }
}
let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
let server = http_1.default.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
app.use('/api/diagnosis', diagnosisRouter_1.default);
app.use('/api/patients', patientRouter_1.default);
app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
