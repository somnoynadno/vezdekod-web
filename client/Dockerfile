# Stage 1 - the build process
FROM node:14-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peеr-deps

ARG REACT_APP_API_ADDRESS
ENV REACT_APP_API_ADDRESS $REACT_APP_API_ADDRESS

COPY . ./

RUN npm run build

# Stage 2 - release
FROM node:14-alpine as release

WORKDIR /app
COPY --from=builder /app/build ./build

RUN npm -g install serve

CMD ["serve", "-s", "build", "-p", "3000"]
EXPOSE 3000
