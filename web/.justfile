# Default
default:
  just --list

# Build Docker Image
build-image:
  docker build -t ranckosolutionsinc/hotel-elmiriam-website:v1.0.0 . 

# Run Docker Container
run-container:
  docker run -d -p 4000:3000 --network hotel-elmiriam --restart always --name hotel-elmiriam-website ranckosolutionsinc/hotel-elmiriam-website:v1.0.0  

# Docker compose 
run-compose:
  docker compose up -d

# Docker compose down
run-compose-down:
  docker compose down

