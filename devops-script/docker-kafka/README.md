# Kafka for DEV

## Login to shellbash of kafka

* docker exec -it kafka /bin/bash

## Create new topic

* docker exec -it kafka kafka-topics.sh --create --bootstrap-server kafka:9092 --topic LeoCdpProfile --partitions 2

## Describe new topic 

* docker exec -it kafka kafka-topics.sh --describe --bootstrap-server kafka:9092 --topic LeoCdpProfile