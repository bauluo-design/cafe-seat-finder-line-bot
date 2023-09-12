# Create multi-layer dockerfiles that first dockerfiles the production source code and then copy the dockerfiles result to a new image and run.
FROM node:18-slim as builder
LABEL authors="brianliu"

COPY . /app
WORKDIR /app

RUN npm install
RUN npm run build

# Create a new image that only contains the production dockerfiles result and run.
FROM builder as production

COPY --from=builder /app/.next /app/.next

EXPOSE 3000

CMD ["npm", "run", "start"]