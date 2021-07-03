#!/bin/sh

JAR_MAIN="leo-main-starter-v_0.20201111-1235.jar"
LEO_CDP_FOLDER="/build/leo-cdp-build/"

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

java -jar $JVM_PARAMS $JAR_MAIN  >> /dev/null 2>&1 &