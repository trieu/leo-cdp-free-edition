# docker-compose-arangodb

ArangoDB with Docker and Docker Compose

# How to upgrade to latest ArangoDB

* docker-compose stop
* docker-compose rm -f arangodb_db_container
* update docker-compose.yml file with new arangodb image
* docker-compose run --rm arangodb_db_container arangod --database.auto-upgrade
* docker-compose up -d arangodb_db_container
* docker-compose start
  
https://stackoverflow.com/questions/46522017/how-to-run-auto-upgrade-of-arangodb-3-1-to-3-2-on-docker-image

## Usage (start server)

On folder that contains `docker-compose.yml` type one of this.

```
// non detach mode
docker-compose up
```
or
```
// detach mode
docker-compose up -d
```

It will spin the ArangoDB latest version (currently 3.x.x version), expose port to host at 8529.

## Usage (stop server)

To shutdown database without remove the container.

```
docker-compose stop
```

To shutdown database and remove the container.
```
docker-compose down
```

Is data or user that already created will gone? No, since in the Docker Compose file you can see that we utilize data container named `arangodb_data_container` and `arangodb_apps_data_container` to store the ArangoDB data and apps.

## ArangoDB credential

- Username: root
- Password: rootpassword

## How to connect to ArangoDB

### Via WebUI
Go to http://localhost:8529

### Via command line
Make sure you have `arangosh` client tool command installed.

```
arangosh --server.endpoint http+tcp://127.0.0.1:8529 --server.password rootpassword
```

Enjoy your local ArangoDB database server for any purpose you want, for me this setup is fine for testing purpose.
