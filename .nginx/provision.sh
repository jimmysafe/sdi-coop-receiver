#!bin/bash

sudo apt update

# install nginx
sudo apt install nginx

# install node
sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
source ~/.profile 
nvm install 16.15.1
nvm use 16.15.1

# install pm2
npm install -g pm2 yarn

