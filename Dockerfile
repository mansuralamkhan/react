# Use an official Node.js runtime as a parent image
FROM node:14 AS build

# Set the working directory
WORKDIR /app

# Copy the package.json and install dependencies
COPY package.json /app/package.json
RUN npm install

# Copy the rest of the application code
COPY . /app

# Build the React application
RUN npm run build

# Use nginx to serve the application
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
