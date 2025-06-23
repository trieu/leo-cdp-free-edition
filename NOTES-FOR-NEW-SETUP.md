# For learning about CDP and setup an instance in your server

	https://knowledge.leocdp.net/p/leo-cdp-training-course.html

## Network requirements

The deployed server must have Internet connection, please set the out-bound fire-wall rules to these domains

    https://storage.googleapis.com
    https://nominatim.openstreetmap.org
    http://ip-api.com
    https://us1.api.mailchimp.com
    https://api.brevo.com

## Update DNS hosts for CDP Solution servers 

Command to edit hosts: 
	
	sudo nano /etc/hosts

### Add Local DNS for all servers

- [the network IP of CDP Database] cdpsys.database
- [the network IP of CDP Admin] cdpsys.admin cdpsys.redis
- [the network IP of CDP Observer] cdpsys.observer

### Example DNS for 1 CDP Database, 1 CDP Admin, 1 CDP Observer, 1 local Redis server

	192.168.1.6 cdpsys.database
	192.168.1.6 cdpsys.admin             
	192.168.1.5 cdpsys.observer
	127.0.0.1 cdpsys.redis
	
### Nginx config for db.example.com

```
	server {

        server_name db.example.com;
        client_max_body_size 30M;

        location / {
             proxy_pass http://cdpsys.database:8600/;
             proxy_set_header X-Forwarded-Proto $scheme;
             proxy_set_header X-Forwarded-Port $server_port;
             proxy_set_header Host            $host;
             proxy_set_header X-Forwarded-For $remote_addr;
        }

        listen 80;
        listen [::]:80;
	}
```

## For all servers in CDP

### 1. Install Java 11 JVM for all 

[Java 11 from Amazon](https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/generic-linux-install.html)

	wget -O- https://apt.corretto.aws/corretto.key | sudo apt-key add -
	sudo add-apt-repository 'deb https://apt.corretto.aws stable main'
	sudo apt-get update; sudo apt-get install -y java-11-amazon-corretto-jdk fontconfig git nano net-tools
	
Java 11 on Rocky / CentOS

	sudo rpm --import https://yum.corretto.aws/corretto.key
	sudo curl -L -o /etc/yum.repos.d/corretto.repo https://yum.corretto.aws/corretto.repo
	sudo yum install -y java-11-amazon-corretto-devel fontconfig git nano net-tools

### 2. Create user for SSH

	sudo useradd cdpsysuser -s /bin/bash -p '*'
	sudo passwd -d cdpsysuser
	sudo usermod -aG sudo cdpsysuser
	echo 'cdpsysuser ALL=(ALL) NOPASSWD: ALL' | sudo tee -a /etc/sudoers >/dev/null

### 3. Set SSH keys

	sudo su cdpsysuser
	sudo mkdir -p /home/cdpsysuser
	cd /home/cdpsysuser
	sudo chown -R cdpsysuser:cdpsysuser /home/cdpsysuser
	mkdir .ssh
	nano .ssh/authorized_keys

=> Set your SSH public key

## ArangoDB database

Set Linux configs to scale on high load

	sudo sysctl -w "vm.max_map_count=512000"
	sudo bash -c "echo madvise > /sys/kernel/mm/transparent_hugepage/enabled"
	sudo bash -c "echo madvise > /sys/kernel/mm/transparent_hugepage/defrag"

[ArangoDB on Ubuntu](https://www.arangodb.com/download-major/ubuntu)

	set -e

	# Download and add the ArangoDB GPG key securely
	curl -fsSL https://download.arangodb.com/arangodb311/DEBIAN/Release.key | sudo gpg --dearmor -o /usr/share/keyrings/arangodb-archive-keyring.gpg

	# Add ArangoDB repository
	echo 'deb [signed-by=/usr/share/keyrings/arangodb-archive-keyring.gpg] https://download.arangodb.com/arangodb311/DEBIAN/ /' | sudo tee /etc/apt/sources.list.d/arangodb.list

	# Update and install ArangoDB
	sudo apt-get update
	sudo apt-get install -y apt-transport-https arangodb3=3.11.14-1

	# Allow UFW rule for ArangoDB observer access
	sudo ufw allow from [IP_Observer] to any port 8600

	
[ArangoDB on CentOS or Rocky Linux](https://idroot.us/install-arangodb-centos-8/)
	
	cd /etc/yum.repos.d/
	curl -OL https://download.arangodb.com/arangodb311/RPM/arangodb.repo
	sudo yum --nogpgcheck install arangodb3 -y
	arango-secure-installation
	>  /var/log/arangodb3/arangod.log
	nano /etc/arangodb3/arangod.conf
	systemctl restart arangodb3.service
	sudo firewall-cmd --add-port=8600/tcp --permanent
	sudo firewall-cmd --reload

## This requirements for HTTP Observer, Admin and Database 

[Install nginx on Ubuntu 22](https://www.fosstechnix.com/how-to-install-nginx-on-ubuntu-22-04/)

	sudo wget https://nginx.org/keys/nginx_signing.key
	sudo apt-key add nginx_signing.key
	
	sudo nano /etc/apt/sources.list
		deb https://nginx.org/packages/mainline/ubuntu/ jammy nginx
		deb-src https://nginx.org/packages/mainline/ubuntu/ jammy nginx
	
	sudo apt-get remove nginx-common; sudo apt-get update ; sudo apt-get install nginx; sudo service nginx start
	
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

### Redis Caching for Admin & Observer

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
	sudo mkdir -p /home/cdpsysuser/ ; sudo chown -R cdpsys:cdpsys /home/cdpsysuser/
	sudo git clone https://github.com/trieu/leo-cdp-free-edition.git /build/cdp-instance
	sudo chown -R cdpsys:cdpsys /build/ ; sudo chmod +x /build/cdp-instance/*.sh
	
## Set-up configs for the CDP instance

### 5 main configs of CDP

- leocdp-metadata.properties => the main config
- configs/PRO-database-configs.json => the database config
- configs/http-routing-configs.json => the http port of CDP admin and event observer
- configs/redis-configs.json => all redis configs to cache data here
- configs/scheduled-jobs-configs.json => the config of all scheduled jobs in CDP

### Admin Dashboard

- Check the value in configs/http-routing-configs.json to get correct HTTP_ROUTER_KEY
- If you need more than one observer instance, please set HTTP_ROUTER_KEY1, HTTP_ROUTER_KEY2,...
- Open start-admin.sh, set correct HTTP_ROUTER_KEY. 
- ./start-admin.sh

### Event Observer

- Check the value in configs/http-routing-configs.json to get correct HTTP_ROUTER_KEY1, HTTP_ROUTER_KEY2, ...
- Open start-observer.sh, set correct HTTP_ROUTER_KEY1, HTTP_ROUTER_KEY2,...
- ./start-observer.sh

### Data Scheduled Jobs

- To run data connector jobs and scheduled jobs, check start-data-connector-jobs.sh
- ./start-data-connector-jobs.sh