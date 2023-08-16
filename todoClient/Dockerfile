FROM node:14 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

# Copy the built app from the build stage to the Nginx container
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
