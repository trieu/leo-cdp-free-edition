# Kafka for PRODUCTION

## Kafka Cluster

### Ref Links

* https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04
* https://ms25.medium.com/apache-kafka-multi-cluster-setup-dc652edc7be1

### Commands

* sudo docker-compose -f zookeeper-1.yml --env-file config.env up -d
* sudo docker-compose -f kafka-broker-1.yml --env-file config.env up -d
* sudo docker-compose -f kafka-broker-2.yml --env-file config.env up -d
* sudo docker-compose -f kafka-broker-3.yml --env-file config.env up -d

### Test commands

#### Producer
* ./kafka-console-producer.sh --topic test --broker-list 10.229.0.38:1001,10.229.0.39:1003,10.229.0.40:1005

#### Consumer
* ./kafka-console-consumer.sh --topic test --bootstrap-server 10.229.0.38:1001,10.229.0.39:1003,10.229.0.40:1005
