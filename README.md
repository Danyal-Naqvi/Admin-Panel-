# Lawyer Hub Web Application – DevOps Mid Term

## Project Overview
This project demonstrates a complete DevOps pipeline for a MERN-based web application.
The backend is built with Node.js and MongoDB Atlas, while the frontend is a React application.

The application is containerized using Docker, pushed to Docker Hub, and deployed on
Azure Kubernetes Service (AKS) using Kubernetes manifests. CI/CD is implemented using
GitHub Actions.

---

## Technologies Used
- Docker
- Docker Hub
- Kubernetes
- Azure Kubernetes Service (AKS)
- GitHub Actions
- MongoDB Atlas
- Node.js
- React

---

## CI/CD Pipeline
1. Code is pushed to GitHub
2. GitHub Actions builds Docker images
3. Images are pushed to Docker Hub
4. Kubernetes manifests deploy the application to AKS

---

## Kubernetes Deployment
- Backend and frontend are deployed using Kubernetes Deployments
- Services expose applications inside the cluster
- Environment variables are used to connect MongoDB Atlas

---

## AKS Verification
AKS cluster was created and connected using:
```bash
az aks get-credentials --resource-group DevOpsExamRG --name DevOpsAKSCluster
