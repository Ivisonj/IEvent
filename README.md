# IEvent

Aplicação Fullstack para criação e gestão de eventos personalizados, com funcionalidades como controle presença via QR Code, registro de participantes e controle de frequência.

<img src="/imgs/ievent.png" alt="ievent" style="width: 600px; height: 500px;">

## Descrição

Este repositório contém o código de uma aplicação Fullstack que permite aos usuários criar, gerenciar e participar de eventos personalizados. A aplicação foi projetada para oferecer uma experiência intuitiva, com recursos como:

- Criação de eventos com datas, horários e regras personalizadas
- Registro de participantes e confirmação de presença via QR Code
- Controle de frequência com status de presença, atraso e falta
- Chat para justificar atrasos e faltas
- Notificações

## Tecnologias Utilizadas

Backend:

- TypeScript
- Node.js
- Nest.js
- PostgreSQL
- Prisma
- Arquitetura Hexagonal

Frontend:

- TypeScript
- React.js
- Next.js
- Material-UI
- React Query

Leitor de QR Code:

- Html5Scanner

## Funcionalidades

1. Eventos Personalizados: Crie eventos com regras para controle de requência.
2. QR Code para Presença: Os participantes podem confirmar presença escaneando um QR Code.
3. Controle de Frequência: Visualize quem compareceu, faltou ou se atrasou.
4. Sistema de Chat: Comunicação integrada para que os usuários possam justificar suas faltas e atrasos.
5. Notificações Automatizadas: Notifique participantes com base na frequência registrada.

## Backend

A arquitetura segue os princípios da Arquitetura Hexagonal, garantindo uma separação clara de responsabilidades entre as camadas internas e externas. Isso facilita a manutenção, escalabilidade e evolução da aplicação.

Utilizamos Nest.js para estruturar o backend, proporcionando uma base sólida com injeção de dependências e suporte a middlewares. O ORM Prisma é utilizado para interagir com o banco de dados PostgreSQL, garantindo eficiência nas operações de persistência.

## Frontend

A interface foi desenvolvida com React.js e estruturada utilizando Next.js para otimizar a renderização e facilitar o roteamento. A biblioteca Material-UI foi utilizada para a criação dos componentes visuais, garantindo uma interface moderna e responsiva.

A aplicação é totalmente adaptada para funcionar em dispositivos móveis e desktops, com React Query gerenciando a comunicação assíncrona com o backend. A leitura de QR Codes é realizada com o Html5Scanner, que permite a utilização de webcams e câmeras de celular para escanear os códigos.
