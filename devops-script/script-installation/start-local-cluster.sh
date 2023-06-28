#!/bin/bash

# the cluster log file name
cluster_arangodb_log="cluster_arangodb.log"

# JWT secret
jwt_secret="leocdp-db.jwt"
if [ ! -f $jwt_secret ]; then
    arangodb create jwt-secret --secret=$jwt_secret --length=32
fi

# set the directory where the database will be stored
data_dir="./localdata"
# create the data directory if it does not exist
if [ ! -d $data_dir ]; then
   mkdir -p $data_dir
fi

# stop 
echo "Stop arangodb"
arangodb stop
sleep 5

# clear all logs
cat /dev/null > $cluster_arangodb_log
echo "Clear $cluster_arangodb_log"

# params for arangodb start
params="--starter.local --starter.data-dir=$data_dir --auth.jwt-secret=$jwt_secret"
# start cluster
echo "Starting arangodb with params: $params"
arangodb $params >> $cluster_arangodb_log 2>&1 &

# make sure it works
sleep 5
ps aux | grep arangod