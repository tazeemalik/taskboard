
A simple microservice-based app:
- **tasks-api** (REST + tiny web UI) for CRUD on tasks
- **stats-api** (REST) providing live task statistics
- **mongodb** as a separate microservice with persistent storage

Deployed on Kubernetes; each API scales horizontally and images are pushed to Docker Hub.
