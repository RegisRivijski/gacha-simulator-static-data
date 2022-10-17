FROM node:16-alpine
MAINTAINER "Artur Petrov petrov0397@gmail.com"

RUN apk --no-cache upgrade && \
    apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Europe/Kiev /etc/localtime && \
    echo "Europe/Kiev" >  /etc/timezone

WORKDIR /app
COPY . .

RUN apk --no-cache add \
    sudo \
    curl \
    build-base \
    g++ \
    libpng \
    libpng-dev \
    jpeg-dev \
    pango-dev \
    cairo-dev \
    giflib-dev \
    python3 \
    ;

RUN npm install

ENTRYPOINT ["npm", "run", "start"]
