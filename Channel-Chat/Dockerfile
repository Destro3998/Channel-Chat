FROM node:16
WORKDIR /Channel-chat
COPY ./package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]