# create a file named Dockerfile
FROM node:8.11.4-jessie
RUN mkdir /app
WORKDIR /app
COPY package.json /app
RUN cat package.json
RUN npm install
COPY . /app
EXPOSE 3000
CMD ["npm", "start"]