# API Documentation

## Descripción
Esta API permite la autenticación de usuarios y la gestión de tareas. Los usuarios pueden registrarse, iniciar sesión y realizar operaciones CRUD en las tareas.

## Endpoints

### 1. Autenticación

#### POST /api/auth/register
- **Descripción:** Registra un nuevo usuario.
- **Parámetros del cuerpo de la solicitud:**
  - `username` (string): Nombre de usuario
  - `password` (string): Contraseña del usuario
- **Respuesta exitosa:** `201 Created`
- **Ejemplo de cuerpo de solicitud:**
    ```json
    {
      "username": "usuario1",
      "password": "contraseñaSegura"
    }
    ```

#### POST /api/auth/login
- **Descripción:** Inicia sesión de un usuario registrado y devuelve un token.
- **Parámetros del cuerpo de la solicitud:**
  - `username` (string): Nombre de usuario
  - `password` (string): Contraseña del usuario
- **Respuesta exitosa:** `200 OK`
- **Ejemplo de cuerpo de solicitud:**
    ```json
    {
      "username": "usuario1",
      "password": "contraseñaSegura"
    }
    ```
- **Ejemplo de respuesta:**
    ```json
    {
      "token": "jwt-token"
    }
    ```

### 2. Tareas

> **Nota:** Todos los endpoints de tareas requieren autenticación. Incluye el token JWT en los encabezados de la solicitud:
> ```
> Authorization: Bearer <token>
> ```

#### GET /api/tasks
- **Descripción:** Obtiene la lista de tareas del usuario autenticado.
- **Respuesta exitosa:** `200 OK`
- **Ejemplo de respuesta:**
    ```json
    [
      {
        "_id": 1,
        "userId": 1,
        "title": "Comprar víveres",
        "description": "Leche, huevos, pan",
        "completed": false
      },
      {
        "_id": 2,
        "userId": 2,
        "title": "Ir al gimnasio",
        "description": "Ejercicio de fuerza",
        "completed": true
      }
    ]
    ```

#### POST /api/tasks
- **Descripción:** Crea una nueva tarea para el usuario autenticado.
- **Parámetros del cuerpo de la solicitud:**
  - `title` (string): Título de la tarea
  - `description` (string): Descripción de la tarea
  - `completed` (boolean): Estado de la tarea (opcional)
- **Respuesta exitosa:** `201 Created`
- **Ejemplo de cuerpo de solicitud:**
    ```json
    {
      "title": "Estudiar para el examen",
      "description": "Repasar los temas de matemáticas",
      "completed": false
    }
    ```

#### PUT /api/tasks/:id
- **Descripción:** Actualiza una tarea específica por su ID.
- **Parámetros de la URL:**
  - `id` (integer): ID de la tarea
- **Parámetros del cuerpo de la solicitud:** (solo incluye los campos a actualizar)
  - `title` (string): Título de la tarea
  - `description` (string): Descripción de la tarea
  - `completed` (boolean): Estado de la tarea
- **Respuesta exitosa:** `200 OK`
- **Ejemplo de cuerpo de solicitud:**
    ```json
    {
      "completed": true
    }
    ```

#### DELETE /api/tasks/:id
- **Descripción:** Elimina una tarea específica por su ID.
- **Parámetros de la URL:**
  - `id` (integer): ID de la tarea
- **Respuesta exitosa:** `200 OK`
- **Ejemplo de respuesta:**
    ```json
    {
      "message": "Tarea eliminada exitosamente"
    }
    ```

## Respuestas de Error Comunes
- **401 Unauthorized:** Token no válido o ausente en la solicitud.
- **404 Not Found:** Recurso no encontrado.
- **500 Internal Server Error:** Error interno del servidor.

## Autenticación
Para acceder a los endpoints de tareas, se requiere un token de autenticación (JWT) en los encabezados de la solicitud:

