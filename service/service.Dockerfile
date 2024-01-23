FROM node:18.19.0-alpine

WORKDIR /app
# COPY ./service/package*.json .
# RUN npm install
COPY ./service .

CMD ["npm", "run", "start"]