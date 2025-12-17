# Use node image to build React app
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Use lightweight server to serve the build
FROM node:18-alpine
RUN npm install -g serve

WORKDIR /app
COPY --from=build /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
