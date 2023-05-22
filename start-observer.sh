#!/bin/sh

LEO_CDP_FOLDER="/build/leo-cdp"
BUILD_VERSION="v_0.9.0"
HTTP_ROUTER_KEY="datahub"

JAR_MAIN="leo-observer-starter-$BUILD_VERSION.jar"

if [ -z "$LEO_CDP_FOLDER" ]
then
      echo "Skip cd to LEO_CDP_FOLDER, just starting ..."
else
      echo "The path: $LEO_CDP_FOLDER is current folder"
      cd $LEO_CDP_FOLDER
fi

JVM_PARAMS="-Xms256m -Xmx1500m -XX:+TieredCompilation -XX:+UseCompressedOops -XX:+DisableExplicitGC -XX:+UseNUMA -server"

kill -15 $(pgrep -f "$HTTP_ROUTER_KEY")
sleep 4

java -jar $JVM_PARAMS $JAR_MAIN $HTTP_ROUTER_KEY >> observer-$HTTP_ROUTER_KEY.log.log 2>&1 &