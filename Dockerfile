FROM node:18-alpine

# Instalar dependências do sistema
RUN apk add --no-cache git

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código da aplicação
COPY . .

# Expor portas do Expo
EXPOSE 8081 19000 19001 19002

# Comando para iniciar o Expo
CMD ["npx", "expo", "start", "--lan"]
