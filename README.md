# Backend – Agenda de Tareas (Express + MongoDB)

Este es el backend de la aplicación “Agenda de Tareas”. Proporciona un sistema de autenticación con verificación por e-mail, manejo de usuarios y un CRUD real de tareas. Está desarrollado con **Node.js**, **Express** y **MongoDB**.

---

## 🚀 credenciales de prueba

    email: taste@prueba.com
    password: 123456

No pude hacer que Render me funcionara con el envio de mail de validación, así que dejo credenciales de acceso.

---

## 🚀 Tecnologías

* Node.js + Express
* MongoDB + Mongoose
* JSON Web Tokens (JWT)
* Envío de e-mails con Nodemailer
* Arquitectura en capas (routes → controllers → services → models)

---

## 📌 Requisitos previos

Asegurate de tener instalado:

* Node.js 18+
* MongoDB Atlas o local
* Una cuenta de Gmail (para el envío de correos)

---

## ⚙️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/[tu-usuario]/agenda-backend.git
cd agenda-backend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env` en la raíz:

```
PORT=5000
MONGO_URI=tu_cadena_mongo
JWT_SECRET=un_token_secreto
BACKEND_URL=http://localhost:5000

EMAIL_USER=tu-correo@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicacion
EMAIL_FROM="Agenda de Tareas <tu-correo@gmail.com>"
```

Iniciar servidor:

```bash
npm run dev
```

---

## 📂 Estructura del proyecto

```
/src
 ├── controllers
 ├── routes
 ├── services
 ├── models
 ├── utils
 └── app.js
```

---

# 📚 Documentación de Endpoints

## 🔐 **Auth**

### **POST /api/auth/register**

Registra un nuevo usuario y envía un e-mail de verificación.

**Body:**

```json
{
  "name": "Astrid",
  "email": "astrid@example.com",
  "password": "123456"
}
```

---

### **GET /api/auth/verify-email?token=**

Confirma la cuenta del usuario.

---

### **POST /api/auth/login**

Inicia sesión.

**Body:**

```json
{
  "email": "astrid@example.com",
  "password": "123456"
}
```

---

## 🧾 **Tareas**

⚠️ **Todas requieren token JWT**
Enviar en headers:

```
Authorization: Bearer <token>
```

---

### **GET /api/tasks**

Obtiene las tareas del usuario logueado.

---

### **POST /api/tasks**

Crea una nueva tarea.

**Body:**

```json
{
  "title": "Comprar comida",
  "description": "supermercado 18hs"
}
```

---

### **PUT /api/tasks/:id**

Actualiza una tarea.

---

### **DELETE /api/tasks/:id**

Elimina una tarea.

---

## 📨 Envío de correo (verificación)

Este backend usa Nodemailer con Gmail y contraseña de aplicación.
El archivo está en:

```
/src/utils/email.js
```

---

## ✔️ Scripts útiles

```
npm run dev   → modo desarrollo
npm start     → modo producción
```

---

## 🧪 Probar la API

Podés usar:

* Postman
* Thunder Client
* Insomnia

La API responde siempre en formato JSON.
