# Use a imagem oficial do Node.js como base
FROM node:18

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o restante do código da sua aplicação para o contêiner
COPY . .

RUN npm run build
# Exponha a porta em que a aplicação Nest.js estará rodando
EXPOSE 3333

# Defina o comando para iniciar sua aplicação Nest.js no modo de produção
CMD ["npm", "run", "start:prod"]
