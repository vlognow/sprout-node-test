FROM node:22-alpine AS build
WORKDIR /app
RUN apk add --no-cache python3 make g++
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY . .
RUN if node -e "process.exit(require('./package.json').scripts && require('./package.json').scripts.build ? 0 : 1)" 2>/dev/null; then npm run build; fi

FROM node:22-alpine
WORKDIR /app
RUN addgroup -g 1001 appuser && adduser -D -u 1001 -G appuser appuser
COPY --from=build /app .
USER 1001
EXPOSE 8090
CMD ["npm", "start"]
