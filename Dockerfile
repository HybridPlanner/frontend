FROM node:20 as builder

#######################################################################
WORKDIR /app

ENV NODE_ENV production

COPY . .
RUN npm ci
RUN npm run build
RUN npm prune --production

#######################################################################
FROM node:20-alpine

WORKDIR /usr/share/nginx/html/

# nginx conf file required to handle React router
COPY nginx.conf /etc/nginx/conf.d/default.conf
# copy the app from the builder
COPY --from=builder /app/package*.json .
COPY --from=builder /app/dist .
COPY --from=builder /app/node_modules .

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]
