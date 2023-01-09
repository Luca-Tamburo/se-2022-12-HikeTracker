FROM node:18
WORKDIR /app
ENV TZ="Europe/Rome"
COPY package.json /app
RUN npm install 
COPY . .
CMD [ "npm", "start" ]
EXPOSE 3000

##installazione##
#docker build -t client .

##per far partire solo il client##
#docker run -p 3000:3000 client