FROM node:18
WORKDIR /app
ENV TZ="Europe/Rome"
COPY package.json /app
RUN npm install 
COPY . .
CMD [ "node", "index.js" ]
EXPOSE 3001

##installazione##
#docker build -t server .

##per far partire solo il server##
#docker run -p 3001:3001 server