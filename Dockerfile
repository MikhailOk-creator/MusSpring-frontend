# Docker file to build a container for application on ReactJS with Vite

# Base image
FROM node:alpine

# Set working directory
WORKDIR /musspring-front

# Copy package.json and package-lock.json
COPY package.json .

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run application
CMD ["npm", "start"]