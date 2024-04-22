# Hotel Elmiriam | Website

## Build Docker Image

To build the image:
`docker build -t ranckosolutionsinc/hotel-elmiriam-website:v1.0.0 . `

## Run the Docker Container

To run the container using the image built:
`docker run -d -p 4000:4000 --network hotel-elmiriam --restart always --name hotel-elmiriam-website ranckosolutionsinc/hotel-elmiriam-website:v1.0.0`

To run using Docker Compose (inside this directory):
`docker compose up -d`
