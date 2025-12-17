# CI/CD Setup Guide

This document explains how to configure GitHub Secrets for the CI/CD pipeline.

## Required GitHub Secrets

You need to add the following secrets to your GitHub repository:

### 1. Docker Hub Credentials

- **`DOCKER_USERNAME`**: Your Docker Hub username
  - Value: `danyalali123`

- **`DOCKER_PASSWORD`**: Your Docker Hub password or access token
  - Go to Docker Hub → Account Settings → Security → New Access Token
  - Copy the token and paste it here

### 2. Azure Credentials

- **`AZURE_CREDENTIALS`**: Azure service principal credentials

To get your Azure credentials, run this command in Azure CLI:

```bash
az ad sp create-for-rbac \
  --name "github-actions-lawyerhub" \
  --role contributor \
  --scopes /subscriptions/{subscription-id}/resourceGroups/DevOpsExamRG \
  --sdk-auth
```

This will output JSON like:
```json
{
  "clientId": "xxxx",
  "clientSecret": "xxxx",
  "subscriptionId": "xxxx",
  "tenantId": "xxxx",
  "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
  "resourceManagerEndpointUrl": "https://management.azure.com/",
  "activeDirectoryGraphResourceId": "https://graph.windows.net/",
  "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
  "galleryEndpointUrl": "https://gallery.azure.com/",
  "managementEndpointUrl": "https://management.core.windows.net/"
}
```

Copy the entire JSON output and paste it as the value for `AZURE_CREDENTIALS` secret.

## How to Add Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** tab
3. Click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Add each secret:
   - Name: `DOCKER_USERNAME`, Value: `danyalali123`
   - Name: `DOCKER_PASSWORD`, Value: `your-docker-token`
   - Name: `AZURE_CREDENTIALS`, Value: `{azure-json-output}`

## Alternative: Get Azure Credentials from Existing AKS

If you already have access to your AKS cluster, you can get the credentials:

```bash
# Get your subscription ID
az account show --query id -o tsv

# Get resource group
az aks list --query "[].{name:name, resourceGroup:resourceGroup}" -o table

# Create service principal
az ad sp create-for-rbac \
  --name "github-actions-lawyerhub" \
  --role contributor \
  --scopes /subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/DevOpsExamRG \
  --sdk-auth
```

## Testing the Pipeline

Once secrets are configured:

1. Commit and push changes to `main` branch:
   ```bash
   git add .
   git commit -m "Add CI/CD pipeline"
   git push origin main
   ```

2. Go to **Actions** tab in GitHub to see the pipeline running

3. The pipeline will:
   - ✅ Build backend and frontend
   - ✅ Create Docker images
   - ✅ Push images to Docker Hub
   - ✅ Deploy to Azure AKS
   - ✅ Update services

## Pipeline Trigger

The pipeline runs automatically on:
- Push to `main` branch
- Pull requests to `main` branch

## Deployment URLs

After successful deployment:
- **Frontend**: http://48.194.84.98/
- **Backend API**: http://13.92.68.107:4000

## Troubleshooting

### If Docker push fails:
- Verify `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets are correct
- Ensure Docker Hub repository exists: `danyalali123/backend-app` and `danyalali123/frontend-app`

### If Azure deployment fails:
- Verify `AZURE_CREDENTIALS` is valid JSON
- Check that AKS cluster name is `DevOpsAKSCluster`
- Check that resource group is `DevOpsExamRG`
- Ensure service principal has contributor role

### View pipeline logs:
- Go to GitHub → Actions tab
- Click on the failed workflow
- Expand the failed step to see error details
