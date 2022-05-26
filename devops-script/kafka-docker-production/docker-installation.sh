#Remove older installations
echo "#################### Removing previous docker installations ###################"
sudo apt-get remove docker docker-engine docker.io containerd runc
sudo apt-get update

#Install the dependencies
echo "########################### Installing dependencies ###########################"
echo "Y" | sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

#Add Docker’s official GPG key
echo "##################### Adding docker's official GPG key #######################"
echo "Y" | curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -


#Set to stable repository
echo "######################### Adding stable repository ###########################"
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

#Install docker cli
echo "############################ Installing docker ###############################"
sudo apt-get update
echo "Y" | sudo apt-get install docker-ce docker-ce-cli containerd.io
echo "Y" | sudo apt-get install docker-compose

#Start docker service
echo "######################### Starting docker service ###########################"
sudo service docker start

#Verfiy installation by running sample image
echo "######################## Verifying the installation #########################"
sudo docker run hello-world