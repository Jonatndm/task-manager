const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Importar la función de conexión a la base de datos
const authRoutes = require('./routes/auth');
const tasksRoutes = require('./routes/tasks');


dotenv.config();
const app = express();

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Para parsear el cuerpo de las solicitudes JSON

// Rutas
app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
