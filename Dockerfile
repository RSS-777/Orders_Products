FROM node:20-bullseye AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM node:20-bullseye
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install --production

COPY backend/ ./
COPY --from=frontend-build /app/frontend/dist ../frontend/dist

EXPOSE 3002
CMD ["node", "src/server.js"]


