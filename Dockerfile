# Setup
FROM node:18-alpine as setup
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

# App Stage
FROM nginx:stable as app

COPY --from=setup /usr/src/app/dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]