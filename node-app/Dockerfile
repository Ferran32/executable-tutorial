# Use the official Node.js LTS image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the app source code
COPY . .

# Expose the app port
EXPOSE 3000

# Define the default command to run the app
CMD ["node", "server.js"]
