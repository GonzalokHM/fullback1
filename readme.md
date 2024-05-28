Esta API está diseñada para la gestión de eventos y asistentes, permitiendo a los usuarios registrarse, autenticarse, crear eventos, confirmar asistencia y administrar usuarios.

## Tecnologías Utilizadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT para autenticación
- Cloudinary para manejo de imágenes
- CORS

## Modelos

- **User**: Información de los usuarios registrados.
  - `name`: Nombre del usuario.
  - `email`: Correo electrónico del usuario.
  - `password`: Contraseña (hashed).
  - `avatar`: Imagen de avatar.
  - `rol`: Rol del usuario.

- **Event**: Información de los eventos creados.
  - `title`: Título del evento.
  - `date`: Fecha del evento.
  - `location`: Ubicación del evento.
  - `description`: Descripción del evento.

- **Attendee**: Información de los asistentes a los eventos.
  - `name`: Nombre del asistente.
  - `email`: Correo electrónico del asistente.
  - `events`: Lista de eventos a los que ha confirmado asistencia.

## Endpoints

### Autenticación

- **POST** `/api/auth/register`: Registrar un nuevo usuario.
- **POST** `/api/auth/login`: Autenticar un usuario y emitir un token JWT.

### Eventos

- **GET** `/api/events`: Listar todos los eventos disponibles.
- **GET** `/api/events/:id`: Obtener detalles de un evento específico.
- **POST** `/api/user/events`: Permitir a los usuarios crear nuevos eventos (Requiere JWT).

### Asistentes

- **GET** `/api/attendees`: Listar todos los asistentes registrados.
- **GET** `/api/attendees/:id`: Obtener detalles de un asistente específico.
- **POST** `/api/user/attendees/:eventId`: Permitir a los usuarios confirmar asistencia a un evento (Requiere JWT).

### Usuarios

- **GET** `/api/user`: Obtener la lista de todos los usuarios.
- **PUT** `/api/user/avatar`: Permitir a los usuarios subir una imagen de avatar. Si ya tienen una imagen, la cambia y elimina la antigua (Requiere JWT).
- **PUT** `/api/user/auth/:id`: Permitir al administrador cambiar el rol de los usuarios (Requiere JWT y rol de Admin).
- **DELETE** `/api/user/auth/:id`: Permitir al administrador eliminar un usuario (Requiere JWT y rol de Admin).

## Seguridad

- Todas las operaciones sensibles están protegidas con JWT.
- La API está configurada con un rate-limiter para evitar abuso del servicio.

## Reutilización del Storage de Cloudinary

El almacenamiento de archivos en Cloudinary se puede reutilizar cambiando la carpeta de destino en la función de subida.
ej:
const result = await uploadToCloudinary(req.file.path, 'user_avatars')
const result = await uploadToCloudinary(req.file.path, 'Avatars')

## Despliegue

[store-full1 | vercel](https://full1.vercel.app)
