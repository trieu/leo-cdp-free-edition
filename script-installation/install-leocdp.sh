#!/bin/sh

sudo apt install git
sudo adduser leocdp; sudo usermod -aG sudo leocdp
echo 'leocdp ALL=(ALL) NOPASSWD: ALL' | sudo tee -a /etc/sudoers > /dev/null
sudo -iu leocdp
sudo mkdir /build
sudo chown leocdp:leocdp /build/
cd /build
git clone https://github.com/trieu/leo-cdp-free-edition.git leo-cdp