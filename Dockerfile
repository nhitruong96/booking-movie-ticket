FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
# RUN npm install --production --silent && mv node_modules ../
RUN npm install --legacy-peer-deps && mv node_modules ../
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
