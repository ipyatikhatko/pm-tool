# Use the official Node.js image as the base image
FROM node:16.13

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Build the app
RUN npm run build

# Expose the app's port (if needed)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
