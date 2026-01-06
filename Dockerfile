FROM node:20-bullseye
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm install --production

COPY backend/ ./
COPY frontend/dist ../frontend/dist

EXPOSE 3000
CMD ["node", "src/server.js"]


