# Kafka for DEV

## Login to shellbash of kafka

* docker exec -it kafka /bin/bash

## Create new topic

* docker exec -it kafka1 kafka-topics.sh --create --bootstrap-server kafka1:19091 --topic LeoCdpEvent --partitions 2
* docker exec -it kafka1 kafka-topics.sh --create --bootstrap-server kafka1:19091 --topic LeoCdpProfile --partitions 2

## Describe new topic 

* docker exec -it kafka1 kafka-topics.sh --describe --bootstrap-server kafka1:19091 --topic LeoCdpEvent
* docker exec -it kafka1 kafka-topics.sh --describe --bootstrap-server kafka1:19091 --topic LeoCdpProfile

## Links

* https://github.com/wurstmeister/kafka-docker/wiki/Connectivity
* Running Kafka on Docker with Compose https://www.youtube.com/watch?v=ncTosfaZ5cQ
* Installing a Kafka Cluster and Creating a Topic https://docs.google.com/document/d/1Mme73cSDWIRP53t7MHXKEZOij9gFG7aIHzyilaTpSYQ/edit?usp=sharing