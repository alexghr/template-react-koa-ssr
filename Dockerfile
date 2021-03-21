FROM node:14 as build

ENV NODE_ENV development
WORKDIR /app

COPY ./package.json yarn.lock lerna.json ./
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/ui/package.json ./packages/ui/

RUN yarn config set yarn-offline-mirror ~/npm-packages-offline-cache && \
  yarn config set yarn-offline-mirror-pruning true && \
  yarn install --frozen-lockfile

COPY ./packages/ ./packages/

# build production bundles
ENV NODE_ENV production
RUN yarn build

# Keep production dependencies
RUN rm -rf node_modules && yarn install --production --frozen-lockfile --offline

# Build the production image
FROM gcr.io/distroless/nodejs:14

ENV PORT 8080
ENV NODE_ENV production

COPY --from=build /app /app
WORKDIR /app

EXPOSE $PORT
CMD [ "./node_modules/.bin/start-server" ]
