# Stage 0:, Build stage
# Step 1: Node base image
FROM node:11-alpine as build-stage

# Step 2: Create working directory
WORKDIR /app

#S tep: 3: Copy packages.
COPY ./package*.json /app/

# Step 3: Install packages
RUN yarn install
RUN yarn add global @angular/cli
RUN yarn ng-version

# Step 4: Copy source files.
COPY . /app/

# Step 5: Build the solution.
RUN yarn build-prod

# Stage 1: Hosting stage
# Step 6: Nginx base image.a
FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*

# Step 7: Copy build-stage output.
COPY --from=build-stage /app/dist/Admin/ /usr/share/nginx/html

# Step 8: Copy Nginx config.
COPY Docker/nginx_default /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
