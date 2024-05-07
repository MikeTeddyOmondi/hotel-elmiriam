# Default
default:
  just --list

# Build Docker Image
build-image:
  docker build -t ranckosolutionsinc/hotel-elmiriam-proxy:v1.0 . 

# Run Docker Container
run-container:
  docker run -d -p 5000:80 --network hotel-elmiriam --restart always --name hotel-elmiriam-proxy ranckosolutionsinc/hotel-elmiriam-proxy:v1.0.0  

# Stop Docker Container
stop-container:
  docker stop hotel-elmiriam-proxy   

# Remove Docker Container
rm-container:
  docker rm hotel-elmiriam-proxy   

# Dispose Docker Container
dispose-container:
  just stop-Container
  just rm-container   

# Docker compose 
compose:
  docker compose -f proxy-service.yml up -d

# Docker compose down
compose-down:
  docker compose -f proxy-service.yml down

