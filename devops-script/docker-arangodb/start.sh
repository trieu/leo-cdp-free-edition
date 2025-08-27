#!/usr/bin/env bash
set -e

# Path to your env file
ENV_FILE="sample.env"

# Check if env file exists
if [[ ! -f "$ENV_FILE" ]]; then
  echo "❌ Missing $ENV_FILE. Please create it first."
  exit 1
fi

# Export variables from env file
echo "🔑 Loading environment variables from $ENV_FILE..."
export $(grep -v '^#' $ENV_FILE | xargs)

# Detect local IP address (IPv4, non-loopback)
HOST_IP=$(hostname -I | awk '{print $1}')

echo "🌍 Host IP detected: $HOST_IP"
echo "   - ArangoDB: http://$HOST_IP:8601"
echo "   - Redis:    $HOST_IP:6379"

# Start Docker Compose
echo "🚀 Starting services with docker-compose..."
docker-compose -f docker-compose.yml up -d

echo "✅ All services are up!"
