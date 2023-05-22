#!/bin/sh

BUILD_VERSION="v_0.9.0"
JAR_MAIN="leo-main-starter-$BUILD_VERSION.jar"

echo "Enter the superadmin-password: "  
read superadmin_password 
echo "Username: superadmin and password: $superadmin_password" 

java -jar $JAR_MAIN setup-leocdp-with-password $superadmin_password