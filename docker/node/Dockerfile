# ============================================================
# Node Build Image — STIKOM Tunas Bangsa Frontend
# ============================================================
# One-shot container: builds the Vite/React SPA and outputs
# static files to /app/dist (shared via Docker volume).
# ============================================================

FROM node:20-alpine AS build

WORKDIR /app

# Install dependencies first (layer caching)
COPY frontend/package.json frontend/package-lock.json ./

RUN npm ci --ignore-scripts

# Copy source & build
COPY frontend/ .

# Build arg for API URL (baked into the SPA at build time)
ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

ARG VITE_APP_NAME="STIKOM Tunas Bangsa"
ENV VITE_APP_NAME=${VITE_APP_NAME}

RUN npm run build


# ── Production stage: just the static files ──────────────────
FROM alpine:3.19 AS production

# Copy built files to a clean image
COPY --from=build /app/dist /app/dist

# This container's sole purpose is to provide the built files.
# The entrypoint copies them to the shared volume, then exits.
ENTRYPOINT ["sh", "-c", "cp -r /app/dist/* /output/ && echo '[frontend] Build files copied to /output' && exit 0"]
