#!/bin/sh

sudo apt-get update; sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx certonly