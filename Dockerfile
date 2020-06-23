# build
FROM node:8.16.0
MAINTAINER full stack <fullstack1120@gmail.com>

WORKDIR /usr/src/app

# run
COPY package*.json ./
RUN npm install

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && echo 'Asia/Shanghai' >/etc/timezone

COPY . .

EXPOSE 9800
CMD ["npm", "start"]
