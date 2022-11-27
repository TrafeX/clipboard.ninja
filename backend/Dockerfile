FROM node:18.12-alpine as base

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

EXPOSE 3001

FROM base as dev

CMD ["npm", "run", "develop"]

FROM base as build

WORKDIR /usr/src/app

# Add dependencies
COPY ./package*.json /usr/src/app/
RUN npm ci

# Add application
COPY . /usr/src/app

RUN npm run build

FROM node:18.12-alpine as production

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Add dependencies
COPY ./package*.json /usr/src/app/
RUN npm ci

COPY --from=build /usr/src/app/build /usr/src/app/

CMD ["npm", "start"]
