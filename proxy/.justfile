# Default
default:
  just --list

# Build Docker Image
build-image:
  docker build -t ranckosolutionsinc/hotel-elmiriam-proxy:v1.0 . 

# Run Docker Container
run-container:
  docker run -d -p 5000:80 --network hotel-elmiriam --restart always --name hotel-elmiriam-proxy ranckosolutionsinc/hotel-elmiriam-proxy:v1.0.0  

# Docker compose 
run-compose:
  docker compose -f proxy.yml up -d

# Docker compose down
run-compose-down:
  docker compose -f proxy.yml down

