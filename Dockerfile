# --------------------------
# | Build target           |
# --------------------------
FROM node:12.16.1-alpine

WORKDIR /home/peepz

COPY package*.json ./
RUN npm install

COPY libs ./libs
COPY tools ./tools
COPY angular.json tsconfig.base.json nx.json .eslintrc.json jest.config.js ./
COPY apps ./apps

RUN npm run nx -- build api --prod && \
    npm run nx -- build peepz --prod --base-href /app && \
    npm prune --production

# --------------------------
# | Production target      |
# --------------------------
FROM node:12.16.1-alpine
EXPOSE 80

WORKDIR /home/peepz

COPY --from=0 /home/peepz/node_modules ./node_modules
COPY --from=0 /home/peepz/dist ./dist

CMD node dist/apps/api/main.js
