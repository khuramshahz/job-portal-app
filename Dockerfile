# Multi-stage build for Job Portal Application
# Stage 1: Build the frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
# Set API URL to empty string for relative URLs (same origin)
ENV VITE_API_URL=
RUN npm run build

# Stage 2: Build the backend and combine with frontend
FROM node:18-alpine
WORKDIR /app

# Copy backend package files
COPY server/package*.json ./
RUN npm install --production

# Copy backend source code
COPY server/ ./

# Copy built frontend from stage 1
COPY --from=frontend-builder /app/client/dist ./public

# Create uploads directory
RUN mkdir -p uploads

# Expose port
EXPOSE 5000

# Set environment to production
ENV NODE_ENV=production

# Start the application
CMD ["node", "index.js"]

