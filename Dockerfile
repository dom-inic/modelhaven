# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Build the application
RUN npm run build

# Runtime stage
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration if needed
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create .env file with runtime values
RUN echo "VITE_GROQ_API_KEY=${VITE_GROQ_API_KEY}" > /usr/share/nginx/html/.env && \
    echo "VITE_SERPER_API_KEY=${VITE_SERPER_API_KEY}" >> /usr/share/nginx/html/.env

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]