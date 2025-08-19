/**
 * @fileoverview API de autenticação segura em Node.js + Express.
 * Implementa rotas para cadastro, login e acesso a rotas protegidas.
 * Utiliza bcryptjs para hashing de senhas e JWT (JSON Web Token) para autenticação baseada em token.
 * Inclui boas práticas de segurança, middleware de verificação de token e estrutura organizada em controllers, services e middlewares.
 *
 * Rotas principais:
 *  - POST /api/auth/register → Cadastra novo usuário com senha hasheada
 *  - POST /api/auth/login    → Autentica usuário e retorna token JWT
 *  - GET  /api/profile       → Rota protegida, exige token válido
 *
 * @author Davi Cândido
 * @github https://github.com/daviKandido
 */


import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de logging
app.use((req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} | Requisição: ${req.method} ${req.url}`
  );
  next();
});

import authRoutes from "./routes/auth.routes.js";
import profileRoutes from "./routes/profile.routes.js";




// Root
app.root = "/api";

// Rotas de autenticação - cadastro e login
app.use(`${app.root}/auth`, authRoutes);

// Rota protegida - exige token válido
app.use(`${app.root}/profile`, profileRoutes);




app.docs = "/docs";

// Rotas de documentação
import docsSwagger from "./docs/swagger.docs.js";
app.use(`${app.docs}/swagger`, docsSwagger);

import docsIndex from "./docs/index.docs.js";
app.use(`${app.docs}`, docsIndex);


export default app;
