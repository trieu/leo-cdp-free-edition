#!/bin/sh

LEO_CDP_FOLDER="./"
BUILD_VERSION="v_0.20210815-23h"

JAR_MAIN="leo-main-starter-$BUILD_VERSION.jar"

if [ -z "$LEO_CDP_FOLDER" ]
then
      echo "Skip cd to LEO_CDP_FOLDER, just starting ..."
else
      echo "The path: $LEO_CDP_FOLDER is current folder"
      cd $LEO_CDP_FOLDER
fi

JVM_PARAMS="-Xms1G -Xmx2G -XX:+TieredCompilation -XX:+UseCompressedOops -XX:+DisableExplicitGC -XX:+UseNUMA -server"

kill -15 $(pgrep -f "leo-main-starter-")
sleep 3

java -jar $JVM_PARAMS $JAR_MAIN  # >> /dev/null 2>&1 &