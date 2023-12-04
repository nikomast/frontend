# Step 1: Use an official Node runtime as the base image
FROM node:14-alpine

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json files and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy the rest of your front-end application source code
COPY . .

# Step 5: Build the application for production
RUN npm run build

# Step 6: Install serve to serve the build folder
RUN npm install -g serve

# Step 7: Expose the port that serve runs on
EXPOSE 5000

# Step 8: Run serve to serve the application
CMD ["serve", "-s", "build"]
