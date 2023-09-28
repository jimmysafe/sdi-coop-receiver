FROM nginx:alpine

COPY .nginx/nginx.conf /etc/nginx/sites-available/default.conf

# Install bash
RUN apk add bash

# Install Node
RUN apk add --update npm
RUN node --version && npm --version

WORKDIR /app

COPY certs/SDI-12779961007-server.key /etc/ssl/
COPY certs/SDI-12779961007-server.pem /etc/ssl/
COPY certs/CAEntrateAll.pem /etc/ssl/
COPY certs/CAEntrateAll_new.pem /etc/ssl/

COPY . .

RUN nginx -t

RUN npm install

RUN npm run build

# Expose the Nginx port
EXPOSE 80

# Start Nginx
CMD ["/bin/bash", "-c", "nginx && npm start"]
