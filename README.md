# SnapScan

SnapScan is a document processing and summarization app that uses OCR (Optical Character Recognition) to extract text from images and uses Ollama's `gemma2:2b` model for summarizing the extracted text. The app is built with **Docker** and uses **Express**, **Multer**, **Tesseract.js**, and **Axios**.

## Features

- Upload an image and extract text using Tesseract OCR.
- Summarize the extracted text using the `gemma2:2b` model via Ollama's API.
- Easy to run with Docker and Docker Compose.

## Prerequisites

- **Docker** and **Docker Compose** installed on your system.
- **Ollama** locally installed if you are not running the Ollama service via Docker.
- **NVIDIA GPU** (optional) for GPU-accelerated tasks in Ollama.

## Local Setup

### 1. Install Ollama Locally (Optional for GPU Users)

To run the `gemma2:2b` model via Ollama on your local machine, follow these steps:

- Download and install Ollama from [Ollama website](https://ollama.com).
- Once installed, run the following command to start the `gemma2:2b` model:

```bash
ollama run gemma2:2b
```
This will start the Ollama server on port 11434.

### 2. Docker Setup
Docker Compose Configuration
This project uses Docker Compose to set up the client, server, and Ollama services. If you're running Ollama locally, you can remove the Ollama service section from the docker-compose.yml file.

1. Clone the repository:
   
```bash
git clone https://github.com/aashinak/SnapScan.git
cd SnapScan
```
2. Update `docker-compose.yml`:
   
  If you have Ollama running locally, update the docker-compose.yml file with the correct host IP for Ollama.

  For Windows users, use the following:
  ```bash
services:
  client:
    image: aashinak/snapscan-client
    ports:
      - "3000:3000"
    depends_on:
      - server

  server:
    image: aashinak/snapscan-server
    ports:
      - "5000:5000"
    environment:
      - HOSTIP=host.docker.internal
  ```
3. Run Docker Compose

   To start the application using Docker Compose, run the following commands:
  ```bash
  docker-compose up --build
  ```

  This will:

  - Build the Docker images for the client and server.
  - Start the containers for the client, server, and Ollama (if you choose to use Docker for Ollama).
  - Expose the necessary ports (3000 for the client, 5000 for the server, and 11434 for Ollama API).
  
4. Access the Application
  
  Once the containers are up and running, you can access the following:

  - Client: Open your browser and go to http://localhost:3000.
  - Server: The backend API will be available at http://localhost:5000.
