#!/bin/sh

sudo wget https://nginx.org/keys/nginx_signing.key
sudo apt-key add nginx_signing.key
sudo nano /etc/apt/sources.list
deb https://nginx.org/packages/mainline/ubuntu/ focal nginx
deb-src https://nginx.org/packages/mainline/ubuntu/ focal nginx
sudo apt-get remove nginx-common
sudo apt-get update && sudo apt-get install nginx
sudo service nginx start