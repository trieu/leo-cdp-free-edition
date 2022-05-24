#!/bin/sh

export KAFKA_DATA=/home/thomas/kafka-data

docker-compose -f ./kafka-cluster.yml up -d 

