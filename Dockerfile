FROM node:alpine
#RUN apt-get update
#RUN apt-get install -y nodejs && apt-get install -y npm
COPY homedash /homedash
WORKDIR homedash
RUN npm install
RUN npm install node-fetch cheerio
RUN npm run build

ENTRYPOINT npm start