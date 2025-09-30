#!/bin/bash

# Define your ArangoDB connection details
HOST="127.0.0.1" 
PORT="8600" 
USER="root" 
PASSWORD="" 

# connect
arangosh --server.endpoint "tcp://${HOST}:${PORT}"  --server.username "${USER}"  --server.password "${PASSWORD}"
