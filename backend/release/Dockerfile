# syntax=docker/dockerfile:1
# Docker - Configuration (Production)
# Build Environment
# Base Image
# Better than alpine due to C library dependency
# It may causes problems with Node
# See https://www.rockyourcode.com/dockerize-a-react-app/
# Use node image for base image for all stages
# Setting platform as Render requirement
FROM --platform=linux/amd64 node:20-buster-slim as base
# Metadata
LABEL org.opencontainers.image.source=https://github.com/lc-2025/accessibility-scanner
LABEL org.opencontainers.image.description="Accessibility Scanner"
LABEL org.opencontainers.image.licenses=UNLICENSED
# Working directory
WORKDIR /accessibility-scanner/backend
# Production dependencies stage
FROM base as deps
# Build Arguments
ARG BASE_URL
ARG PORT
ARG DB_HOST
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
# Environment Variables
ENV BASE_URL ${BASE_URL}
ENV PORT ${PORT}
ENV DB_HOST ${DB_HOST}
ENV DB_NAME ${DB_NAME}
ENV DB_USER ${DB_USER}
ENV DB_PASSWORD ${DB_PASSWORD}
# Download dependencies as a separate step to take advantage of Docker's caching.
# Leverage a cache mount to /root/.npm to speed up subsequent builds.
# Leverage bind mounts to package.json and package-lock.json to avoid having to copy them
# into this layer.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm i --omit=dev
# Production build stage
FROM deps as build
# Build Arguments
ARG BASE_URL
ARG PORT
ARG DB_HOST
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
# Environment Variables
ENV BASE_URL ${BASE_URL}
ENV PORT ${PORT}
ENV DB_HOST ${DB_HOST}
ENV DB_NAME ${DB_NAME}
ENV DB_USER ${DB_USER}
ENV DB_PASSWORD ${DB_PASSWORD}
# Download additional development dependencies before building, as some projects require
# "devDependencies" to be installed to build. If you don't need this, remove this step.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=cache,target=/root/.npm \
    npm i
# Copy source files
COPY . .
# Build production version
RUN npm run build
# Production start stage
FROM base as final
# Non-root user run
USER node
# Download additional development dependencies before building, as some projects require
# Chrome Headless Shell for Puppeteer
RUN mkdir -p /home/node/.cache/puppeteer && \
    npx @puppeteer/browsers install chrome@stable \
    --path /home/node/.cache/puppeteer
RUN ls -la /home/node/.cache/puppeteer/chrome/ || echo "Chrome non trovato!"
# Copy package
COPY package.json .
# Copy production dependencies & build
COPY --from=deps /accessibility-scanner/backend/node_modules ./node_modules
COPY --from=build /accessibility-scanner/backend/dist ./dist
# Expore Port
EXPOSE ${PORT}
# Start app
CMD ["npm", "run", "start"]
