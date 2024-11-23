const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');
const http = require('http');
const { Server } = require('socket.io');


dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.io = io; // Agrega io al objeto req
    next();
});

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});


// Rutas
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);


// Iniciar el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


module.exports = { app, server, io }; // Exporta io
