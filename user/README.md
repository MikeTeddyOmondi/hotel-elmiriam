# Hotel Elmiriam | Admin Panel

## Build Docker Image

To build the image:
`docker build -t ranckosolutionsinc/hotel-elmiriam-user-panel:v1.0.0 . `

## Run the Docker Container

To run the container using the image built:
`docker run -d -p 5000:5000 --network hotel-elmiriam --restart always --name hotel-elmiriam-user-panel ranckosolutionsinc/hotel-elmiriam-user-panel:v1.0.0`

To run using Docker Compose (inside this directory):
`docker compose -f user-panel.yml up -d`
