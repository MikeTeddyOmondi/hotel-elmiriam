# Default
default:
  just --list

# Build Docker Image
build-image:
  docker build -t ranckosolutionsinc/hotel-elmiriam-user-panel:v1.0.0 . 

# Run Docker Container
run-container:
  docker run -d -p 5000:5000 --network hotel-elmiriam --restart always --name hotel-elmiriam-user-panel ranckosolutionsinc/hotel-elmiriam-user-panel:v1.0.0  

# Docker compose 
run-compose:
  docker compose -f user-panel.yml up -d

# Docker compose down
run-compose-down:
  docker compose -f user-panel.yml down

