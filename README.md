# Mobile Radio Arautos
![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

## Descrição do Projeto
Este projeto é uma aplicação que permite aos usuários ouvir e interagir com transmissões de rádio ao vivo, oferecendo uma interface amigável e recursos de interação.


## Tecnologias Utilizadas
- React Native
- TypeScript
- Node.js
- Docker

## Como rodar o projeto via Docker (Recomendado)
1. Clone o repositório: 
```bash
git clone git@github.com:Lucass-trra/arautos-mobile-radio.git
```
2. Navegue até o diretório do projeto: 
```bash
cd mobile-radio-arautos
```
3. Gere a imagem docker do projeto: 
```bash
docker build -t mobile-arautos-radio .
```
4. Crie o container usando o docker compose: 
```bash 
docker compose up
```

> OBS: Para conseguir rodar o projeto localmente via docker é preciso ter instalado em sua máquina o docker compose e o CLI do docker. Caso prefira não usar o docker compose, segue abaixo o comando alternativo:<br>
```bash
docker run -p 8081:8081 -p 19000:19000 -p 19001:19001 -p 19002:19002 mobile-radio-arautos
```

## Como Rodar o Projeto Localmente
1. Clone o repositório: 
```bash
git clone git@github.com:Lucass-trra/arautos-mobile-radio.git
```
2. Navegue até o diretório do projeto: 
```bash
cd mobile-radio-arautos
```
3. Instale as dependências: 
```bash
npm install
```
4. Inicie o projeto: 
```bash 
npx expo start
```

## Como contribuir 
1. Faça o clone do repositório e crie sua branch:
```bash 
git checkout -b feature/your-feature
```

2. Faça suas alterações e crie o commit:
```bash
    git commit -m "Add your feature"
```

3. Conecte seu git local com as URLs remotas de push/fetch e confirme se deu certo:
```bash
git remote add origin git@github.com:Lucass-trra/arautos-mobile-radio.git
git remote show origin
```

4. Mande o push para criar o pull request:
```bash
    git push origin feature/your-feature"
```