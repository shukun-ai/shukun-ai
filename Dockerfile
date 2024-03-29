FROM node:18-slim AS base
WORKDIR /usr/src/app
COPY . .
ENV VITE_SERVER_API=
RUN npm install
RUN npx nx reset cache
RUN npm run db:generate
RUN npm run lint
RUN npm run test
RUN npm run build
RUN npm run package

FROM node:18-slim AS app
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/dist/installation/app/ .
COPY --from=base /usr/src/app/apps/core/drizzle-client/src/migration ./apps/core/drizzle-client/src/migration
EXPOSE 3000
WORKDIR /usr/src/app
ENTRYPOINT ["node", "index.js"]

FROM node:18-slim AS web
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/dist/apps/web/ .
EXPOSE 3000
WORKDIR /usr/src/app
RUN npm install -g local-web-server
ENTRYPOINT ["ws", "-p", "3000", "--spa", "index.html"]
