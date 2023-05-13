FROM nginx:alpine

COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Install bash
RUN apk add bash

# Install Node
RUN apk add --update npm
RUN node --version && npm --version

WORKDIR /app

COPY certs/SDI-12779961007-server.key /etc/nginx/certs/
COPY certs/SDI-12779961007-server.pem /etc/nginx/certs/
COPY certs/CAEntrateAll.pem /etc/nginx/certs/

COPY . .

RUN nginx -t

RUN npm install

RUN npm run build

# Expose the Nginx port
EXPOSE 80

# Start Nginx
CMD ["/bin/bash", "-c", "nginx && npm start"]
