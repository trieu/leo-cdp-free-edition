# Infrastructure Setup for a new LeoCDP instance

You can watch this video tutorial at the link: [How to setup a new software instance of LEO CDP](https://knowledge.leocdp.net/p/how-to-setup-new-software-instance-of.html)

## Network requirements

The deployed server must have Internet connection, please set the out-bound firewall rules to these domains

    https://nominatim.openstreetmap.org
    https://cloudservice.leocdp.com
    https://storage.googleapis.com/leocdp-license
    http://api.ipstack.com
    https://us1.api.mailchimp.com
    https://api.sendinblue.com

## Software requirements for new server

### ArangoDB database

[ArangoDB download](https://www.arangodb.com/download-major/ubuntu)

	curl -OL https://download.arangodb.com/arangodb39/DEBIAN/Release.key
	sudo apt-key add - < Release.key
	echo 'deb https://download.arangodb.com/arangodb39/DEBIAN/ /' | sudo tee /etc/apt/sources.list.d/arangodb.list
	sudo apt-get install apt-transport-https
	sudo apt-get update
	sudo apt-get install arangodb3=3.9.2-1

### Nginx Proxy

[Install nginx on Ubuntu 20](https://www.tecmint.com/install-nginx-on-ubuntu-20-04)

	sudo wget https://nginx.org/keys/nginx_signing.key
	sudo apt-key add nginx_signing.key
	sudo nano /etc/apt/sources.list
	deb https://nginx.org/packages/mainline/ubuntu/ focal nginx
	deb-src https://nginx.org/packages/mainline/ubuntu/ focal nginx
	sudo apt-get remove nginx-common
	sudo apt-get update && sudo apt-get install nginx
	sudo service nginx start


### SSL for Nginx Server

[SSL certbot](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)

	sudo apt-get update; sudo apt-get install python-is-python3; sudo apt install certbot python3-certbot-nginx
	sudo certbot --nginx certonly


### Java 11 JVM

[Java 11 from Amazon](https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/generic-linux-install.html)

	wget -O- https://apt.corretto.aws/corretto.key | sudo apt-key add - 
	sudo add-apt-repository 'deb https://apt.corretto.aws stable main'
	sudo apt-get update; sudo apt-get install -y java-11-amazon-corretto-jdk fontconfig

### Redis Caching

* [Redis on Ubuntu](https://vitux.com/install-redis-on-ubuntu/)
* [Redis Cluster](https://success.outsystems.com/Support/Enterprise_Customers/Installation/Configuring_OutSystems_with_Redis_in-memory_session_storage/Set_up_a_Redis_Cluster_for_Production_environments)

    sudo apt-get update; sudo apt -y install redis-server

## Install Notes for Linux Server

### Clone binary code for new server

	sudo useradd leocdp -s /bin/bash -p '*'
	sudo passwd -d leocdp
	sudo usermod -aG sudo leocdp
	echo 'leocdp ALL=(ALL) NOPASSWD: ALL' | sudo tee -a /etc/sudoers >/dev/null
	# make folder to git pull 
	sudo mkdir /build/
	sudo git clone https://github.com/trieu/leo-cdp-free-edition.git /build/leo-cdp
	sudo chown -R leocdp:leocdp /build/ ; sudo chmod +x /build/leo-cdp/*.sh
	sudo mkdir -p /home/leocdp/ ; sudo chown -R leocdp:leocdp /home/leocdp/ 
	

### DNS hosts for LEO CDP servers 

Command to edit hosts: 
	
	sudo nano /etc/hosts

#### Add Local DNS for all servers

- [the network IP of ArangoDB Server] leocdp.database
- [the network IP of Redis Server] leocdp.redis
- [the network IP of LeoCDP Admin] leocdp.admin
- [the network IP of LeoCDP Data Observer] leocdp.observer0

#### Example DNS for 1 ArangoDB database server, 1 Redis cache server, 1 Admin server and 2 data observers

	10.2.0.5 leocdp.database
	10.4.0.3 leocdp.redis
	10.4.0.3 leocdp.admin
	10.1.0.8 leocdp.observer1
	10.1.0.11 leocdp.observer2