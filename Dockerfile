FROM node:latest
ENV NODE_ENV=development
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]
# RUN npm install --production --silent && mv node_modules ../
RUN npm install --legacy-peer-deps --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
