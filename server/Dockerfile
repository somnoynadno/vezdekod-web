FROM node:14-alpine

WORKDIR /app
COPY . ./

RUN npm install --legacy-perr-deps

USER node
CMD ["npm", "start"]

EXPOSE 5000
