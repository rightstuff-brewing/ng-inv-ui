FROM nginx

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy built app to wwwroot
COPY ./dist /usr/share/nginx/html