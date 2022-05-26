# Kafka for PRODUCTION

## Kafka Cluster

### Ref Links

* https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04
* https://ms25.medium.com/apache-kafka-multi-cluster-setup-dc652edc7be1

### Commands

* sudo docker-compose -f path-to-zookeeper-1.yml --env-file config.env up -d
* sudo docker-compose -f path-to-kafka-broker-1.yml --env-file config.env up -d
* sudo docker-compose -f path-to-kafka-broker-2.yml --env-file config.env up -d
* sudo docker-compose -f path-to-kafka-broker-3.yml --env-file config.env up -d
