FROM node:20-alpine AS builder

COPY package*.json /jirareport-web/
WORKDIR /jirareport-web

# Install dependencies first (better caching)
RUN npm ci --only=production

# Copy source code
COPY . .

ENV REACT_APP_API_URL="/api"

# Build the application
RUN npm run build

###

FROM nginx:1.25-alpine
EXPOSE 80

COPY --from=builder /jirareport-web/build/ /usr/share/nginx/html/
ADD nginx.conf.template /usr/src/nginx.conf.template

ENV DOLLAR="$"

CMD ["/bin/sh", "-c", "envsubst < /usr/src/nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
