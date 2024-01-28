# Use the latest Node.js version as the base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy the rest of the project files
COPY . .

# Build the Next.js project
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the app
CMD ["yarn", "start"]
