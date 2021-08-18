# Infrastructure Setup for a new LeoCDP instance

## Network requirements

The installed server must have Internet connection, please set the outbound firewall rules to these domains

    https://nominatim.openstreetmap.org/search
    https://cloudservice.leocdp.com
    https://storage.googleapis.com/leocdp-license/
    http://api.ipstack.com/
    https://us1.api.mailchimp.com/3.0/ping
    https://api.sendinblue.com/v3/

## Software requirements for new server

### ArangoDB

- https://www.arangodb.com/download-major/ubuntu/
- curl -OL https://download.arangodb.com/arangodb37/DEBIAN/Release.key
- sudo apt-key add - < Release.key
- echo 'deb https://download.arangodb.com/arangodb37/DEBIAN/ /' | sudo tee /etc/apt/sources.list.d/arangodb.list
- sudo apt-get install apt-transport-https
- sudo apt-get update
- sudo apt-get install arangodb3=3.8.0-1

### Nginx Proxy

- sudo wget https://nginx.org/keys/nginx_signing.key
- sudo apt-key add nginx_signing.key
- sudo nano /etc/apt/sources.list

  deb https://nginx.org/packages/mainline/ubuntu/ bionic nginx
  deb-src https://nginx.org/packages/mainline/ubuntu/ bionic nginx

- sudo apt-get remove nginx-common
- sudo apt-get update && sudo apt-get install nginx
- sudo service nginx start

### SSL for Nginx Server

https://linuxconfig.org/how-to-setup-the-nginx-web-server-on-ubuntu-18-04-bionic-beaver-linux

- sudo add-apt-repository ppa:certbot/certbot
- sudo apt-get update
- sudo apt-get install python3-certbot-nginx
- sudo certbot --nginx certonly

### Java 8 JVM

https://docs.aws.amazon.com/corretto/latest/corretto-8-ug/generic-linux-install.html

    wget -O- https://apt.corretto.aws/corretto.key | sudo apt-key add -
    sudo add-apt-repository 'deb https://apt.corretto.aws stable main'
    sudo apt-get update; sudo apt-get install -y java-1.8.0-amazon-corretto-jdk
    sudo apt-get install fontconfig

### Redis

https://computingforgeeks.com/how-to-install-redis-on-ubuntu-18-04-debian-9/

    sudo add-apt-repository ppa:chris-lea/redis-server
    sudo apt-get update; sudo apt -y install redis-server

## Install Notes for Linux Server

### For new server

- sudo adduser leocdp; sudo usermod -aG sudo leocdp
- sudo -iu leocdp
- sudo visudo => Add the following line at the end of file: leocdp ALL=(ALL) NOPASSWD: ALL
- sudo mkdir /build; sudo chown leocdp:leocdp /build/
- cd /build; git clone https://github.com/trieu/leo-cdp-free-edition.git

### Add DNS hosts for all servers in LEO CDP

- sudo nano /etc/hosts

	[the network IP of ArangoDB Server] leocdp.database
	[the network IP of Redis Server] leocdp.redis
	[the network IP of LeoCDP Admin] leocdp.admin
	[the network IP of LeoCDP Data Observer] leocdp.observer0



