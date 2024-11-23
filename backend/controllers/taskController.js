const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
};

// Crear una nueva tarea
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTask = new Task({ title, description, userId: req.user.id });
        await newTask.save();

        req.io.emit('actualizacion-tareas', {
            message: 'Agregaron una nueva tarea',
            task: newTask,
        }); 

        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({error: 'Error al crear tarea'});
    }

};

// Eliminar una tarea por ID
exports.deleteTask = async (req, res) => {
    try {

        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        // Emitir evento de eliminación
        req.io.emit('tarea-eliminada', { 
            id: req.params.id,
            message: 'Borraron la tarea con titulo',
            task: task,
        });

        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};

// Actualizar el estado de completado de una tarea
exports.updateTask = async (req, res) => {
    const { completed } = req.body;
    try {

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { completed },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        // Emitir evento de actualización
        req.io.emit('tarea-actualizada', {
            message: 'Se actualizo la tarea',
            task: task,
        });

        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
};