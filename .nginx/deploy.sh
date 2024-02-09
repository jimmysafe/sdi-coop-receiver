#!/bin/sh

#  Clonare repo
git clone git@github.com:jimmysafe/sdi-coop-receiver.git
cd sdi-coop-receiver

yarn install
yarn build

# Copiare Certificati

cp certs/SDI-12779961007-server.key /etc/ssl/
cp certs/SDI-12779961007-server.pem /etc/ssl/
cp certs/CAEntrateAll.pem /etc/ssl/
cp certs/CAEntrateAll_new.pem /etc/ssl/
cp certs/server.pem /etc/ssl/

rm /etc/nginx/sites-available/default
cp .nginx/default /etc/nginx/sites-available/

#  Restart nginx
sudo nginx -t
sudo service nginx restart

# Start application 
pm2 start dist/index.js --watch --ignore-watch="node_modules"
