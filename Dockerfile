FROM node:18-alpine
MAINTAINER "Artur Petrov petrov0397@gmail.com"

RUN apk --no-cache upgrade && \
    apk --no-cache add tzdata && \
    cp /usr/share/zoneinfo/Europe/Kiev /etc/localtime && \
    echo "Europe/Kiev" >  /etc/timezone

WORKDIR /app
COPY . .

RUN apk add \
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

RUN chmod +x /app/bin/start.sh

ENTRYPOINT ["/app/bin/start.sh"]
