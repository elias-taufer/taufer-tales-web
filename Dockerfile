# ---- build the Angular app ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# production build (your angular.json defaults to production)
RUN npm run build

# ---- serve with nginx ----
FROM nginx:1.27-alpine
# Angular 17+/20 dist path matches your project name
COPY --from=build /app/dist/taufer-tales-web/browser /usr/share/nginx/html
# nginx config for SPA (history API fallback)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
