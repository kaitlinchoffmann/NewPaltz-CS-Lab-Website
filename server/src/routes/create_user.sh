#!/bin/bash
email="$1"
nId="$2"

userName=$(echo "$email" | awk -F"@" '{print $1}')
pswd='S'$(echo "$nId" | awk -F'[^0-9]*' '$0=$2')

sudo useradd "$userName" -m
sudo sh -c "echo $userName:$pswd | chpasswd"
sudo usermod -a -G student "$userName"
sudo chsh -s /bin/bash "$userName"
sudo passwd --expire "$userName"
sudo setquota -u "$userName" 10000M 10050M 0 0 /