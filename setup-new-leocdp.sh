#!/bin/sh

BUILD_VERSION="v_0.20210815-23h"
JAR_MAIN="leo-main-starter-$BUILD_VERSION.jar"

echo "Enter the superadmin-password: "  
read superadmin_password  

java -jar $JAR_MAIN init-leocdp-with-superadmin-password $superadmin_password
