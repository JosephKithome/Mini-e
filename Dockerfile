# Use Nginx as the base image
FROM nginx:alpine

# Copy the Angular dist folder (adjust if needed)
COPY dist/jipushloansfrontend/ /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
