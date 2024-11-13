# Estágio 1: Build
FROM node:20-alpine AS build

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Rodar o build da aplicação NestJS
RUN npm run build

# Estágio 2: Executar
FROM node:20-alpine AS runtime

# Definir diretório de trabalho
WORKDIR /usr/src/app

# Copiar as dependências do estágio de build
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Copiar o arquivo de configuração .env
COPY .env ./

# Expor a porta em que o NestJS vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]