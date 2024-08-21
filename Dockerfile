FROM node:18 AS build

#WORKDIR /app
COPY . .
#RUN cp -r /task/pack*.json .*

# Copy package.json and package-lock.json
#COPY package*.json ./

# Install dependencies
RUN cd /task && \
    npm install

# Copy the rest of the application code
#COPY . .

# Build the application
RUN cd /task && \
    npm run builde a smaller base image to serve the application
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=build /task/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
