# Use a specific version of Node.js as the base image.
# 'alpine' variants are smaller and more secure. Node.js 18 is a good LTS version.
FROM node:24-alpine

# Set the working directory inside the container.
# All subsequent commands will be run from this directory.
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker's caching.
# If only your code changes, Docker won't re-run 'npm ci'.
COPY package*.json ./

# Install project dependencies.
# 'npm ci' is preferred for consistent, reproducible builds in CI/CD.
RUN npm ci

# Copy the rest of your application code into the container.
# The '.' means copy everything from the current directory (where Dockerfile is)
# into the WORKDIR (/app) in the container.
COPY . .

# Expose the port your Express application listens on.
# This must match the PORT in your .env (8080).
EXPOSE 8080

# Define the command to run your application when the container starts.
# This executes the "start" script defined in your package.json.
CMD ["npm", "start"]