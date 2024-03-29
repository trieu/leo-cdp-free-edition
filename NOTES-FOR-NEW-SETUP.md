# Infrastructure Setup for a new LeoCDP instance

The tutorial video: [How to setup a new software instance of LEO CDP](https://knowledge.leocdp.net/p/how-to-setup-new-software-instance-of.html)

## Network requirements

The deployed server must have Internet connection, please set the out-bound firewall rules to these domains

    https://storage.googleapis.com/leocdp-license
    https://nominatim.openstreetmap.org
    https://cloudservice.leocdp.com
    http://api.ipstack.com
    https://us1.api.mailchimp.com
    https://api.brevo.com

## This requirements for all server

### 1. Update DNS hosts for LEO CDP servers 

Command to edit hosts: 
	
	sudo nano /etc/hosts

#### Add Local DNS for all servers

- [the network IP of ArangoDB Server] leocdp.database
- [the network IP of Redis Server] leocdp.redis
- [the network IP of LeoCDP Admin] leocdp.admin
- [the network IP of Data Observer] leocdp.observer

#### Example DNS for 1 ArangoDB database server, 1 Redis cache server, 1 Admin server and 2 data observers

	127.0.0.1 leocdp.database
	127.0.0.1 leocdp.redis
	127.0.0.1 leocdp.admin
	127.0.0.1 leocdp.observer

### 2. Install Java 11 JVM for all 

[Java 11 from Amazon](https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/generic-linux-install.html)

	wget -O- https://apt.corretto.aws/corretto.key | sudo apt-key add -
	sudo add-apt-repository 'deb https://apt.corretto.aws stable main'
	sudo apt-get update; sudo apt-get install -y java-11-amazon-corretto-jdk fontconfig git
	
Java 11 on Rocky / CentOS

	sudo rpm --import https://yum.corretto.aws/corretto.key
	sudo curl -L -o /etc/yum.repos.d/corretto.repo https://yum.corretto.aws/corretto.repo
	sudo yum install -y java-11-amazon-corretto-devel git fontconfig

### 3. Create user for SSH

	sudo useradd leocdp -s /bin/bash -p '*'
	sudo passwd -d leocdp
	sudo usermod -aG sudo leocdp
	echo 'leocdp ALL=(ALL) NOPASSWD: ALL' | sudo tee -a /etc/sudoers >/dev/null

### 4. Set SSH keys

	sudo su leocdp
	cd /home/leocdp 
	mkdir .ssh
	nano .ssh/authorized_keys

Set your SSH public key


## This requirements for ArangoDB database

Set Linux configs to scale on high load

	sudo sysctl -w "vm.max_map_count=512000"
	sudo bash -c "echo madvise > /sys/kernel/mm/transparent_hugepage/enabled"
	sudo bash -c "echo madvise > /sys/kernel/mm/transparent_hugepage/defrag"

[ArangoDB on Ubuntu](https://www.arangodb.com/download-major/ubuntu)

	curl -OL https://download.arangodb.com/arangodb311/DEBIAN/Release.key
	sudo apt-key add - < Release.key
	echo 'deb https://download.arangodb.com/arangodb311/DEBIAN/ /' | sudo tee /etc/apt/sources.list.d/arangodb.list
	sudo apt-get install apt-transport-https
	sudo apt-get update && sudo apt-get install arangodb3=3.11.8-1
	
[ArangoDB on CentOS or Rocky Linux](https://idroot.us/install-arangodb-centos-8/)
	
	cd /etc/yum.repos.d/
	curl -OL https://download.arangodb.com/arangodb311/RPM/arangodb.repo
	sudo yum --nogpgcheck install arangodb3 -y
	arango-secure-installation
	>  /var/log/arangodb3/arangod.log
	nano /etc/arangodb3/arangod.conf
	systemctl restart arangodb3.service
	sudo firewall-cmd --add-port=8601/tcp --permanent
	sudo firewall-cmd --reload

## This requirements for HTTP Observer, Admin and Database 

[Install nginx on Ubuntu 22](https://www.fosstechnix.com/how-to-install-nginx-on-ubuntu-22-04/)

	sudo wget https://nginx.org/keys/nginx_signing.key
	sudo apt-key add nginx_signing.key
	
	sudo nano /etc/apt/sources.list
		deb https://nginx.org/packages/mainline/ubuntu/ jammy nginx
		deb-src https://nginx.org/packages/mainline/ubuntu/ jammy nginx
	
	sudo apt-get remove nginx-common
	sudo apt-get update ; sudo apt-get install nginx; sudo service nginx start
	
[Install nginx on Rocky Linux 9](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-rocky-linux-9)
	
	sudo dnf install nginx
	sudo systemctl enable nginx
	sudo systemctl start nginx
	sudo firewall-cmd --permanent --add-service=http
	sudo firewall-cmd --reload
	systemctl status nginx
	

### SSL for Nginx Server

[SSL certbot on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04)

	sudo apt-get update; sudo apt-get install python-is-python3; sudo apt install certbot python3-certbot-nginx
	sudo certbot --nginx

SSL certbot on Rocky Linux

	sudo dnf install certbot python3-certbot-nginx
	sudo certbot --nginx

### Redis Caching for Admin

* [Redis on Ubuntu](https://vitux.com/install-redis-on-ubuntu/)
* [Redis Cluster](https://success.outsystems.com/Support/Enterprise_Customers/Installation/Configuring_OutSystems_with_Redis_in-memory_session_storage/Set_up_a_Redis_Cluster_for_Production_environments)

Ubuntu 

    sudo apt-get update; sudo apt -y install redis-server

CentOS or Rocky
    
    sudo dnf -y install redis
    sudo systemctl enable redis --now

## Java Deployment for Admin, Observer and Data Jobs

### Clone binary code for new server

	# make folder to git pull 
	sudo mkdir /build/
	sudo mkdir -p /home/leocdp/ ; sudo chown -R leocdp:leocdp /home/leocdp/
	sudo git clone https://github.com/trieu/leo-cdp-free-edition.git /build/leo-cdp
	sudo chown -R leocdp:leocdp /build/ ; sudo chmod +x /build/leo-cdp/*.sh
	
