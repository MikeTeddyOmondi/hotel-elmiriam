# Default
default:
  just --list

# Build Docker Image
build-image:
  docker build -t ranckosolutionsinc/hotel-elmiriam-admin-panel:v1.0 . 

# Run Docker Container
run-container:
  docker run -d -p 3000:3000 --network hotel-elmiriam --restart always --name hotel-elmiriam-user-panel ranckosolutionsinc/hotel-elmiriam-admin-panel:v1.0  

# Docker compose 
compose:
  docker compose -f admin-panel.yml up -d

# Docker compose down
compose-down:
  docker compose -f admin-panel.yml down

