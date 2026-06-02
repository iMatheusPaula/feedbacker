# Feedbacker

## Sobre o projeto

O Feedbacker é uma aplicação web para coleta e gerenciamento de feedbacks para sites. O projeto consiste em um
dashboard para administração e um widget que pode ser instalado em qualquer site para coletar feedbacks dos visitantes.

## Estrutura do projeto

- **laravel**: Contém o backend da aplicação desenvolvido com o framework Laravel 10. Responsável pela API RESTful que
  gerencia usuários, autenticação e feedbacks.
- **dashboard**: Aplicação front-end desenvolvida com Nuxt.js e Vue 3 para gerenciamento dos feedbacks recebidos. Inclui
  funcionalidades de autenticação, visualização e gerenciamento dos feedbacks.
- **widget**: Componente web independente desenvolvido com Nuxt.js que pode ser instalado em qualquer site para coletar
  feedbacks dos usuários.
- **tryWidget**: Página web simples para demonstração e testes do widget de feedbacks.

## Principais funcionalidades

### Backend (Laravel)

- Autenticação de usuários com Laravel Sanctum
- API RESTful para gerenciamento de feedbacks
- Armazenamento de feedbacks

### Dashboard (Nuxt.js/Vue 3)

- Interface para gerenciamento de feedbacks
- Autenticação de usuários
- Visualização e filtragem de feedbacks
- Gerenciamento de conta e token de API

### Widget (Nuxt.js/Vue 3)

- Componente web leve e personalizável
- Coleta de feedbacks
- Detecção automática de informações do dispositivo e página

## Tecnologias utilizadas

### Backend

- PHP 8.3
- Laravel 10
- Laravel Sanctum para autenticação
- MySQL/PostgreSQL

### Frontend

- Vue.js 3.4
- Nuxt.js 3.11
- TypeScript
- Tailwind CSS
- Pinia

### Testes

- Cypress para testes E2E
- Vitest para testes unitários

## Instalação

### Backend

1. Configure o arquivo `.env` baseado no `.env.example`
2. Execute `composer install`
3. Execute `php artisan migrate`
4. Execute `php artisan serve`

### Dashboard

1. Configure o arquivo `.env` baseado no `.env.example`
2. Execute `npm install`
3. Execute `npm run dev`

### Widget

1. Instale o widget em seu site utilizando o script fornecido pelo dashboard
2. Configure as opções de acordo com as necessidades do seu site
