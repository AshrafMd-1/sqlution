FROM node:21-alpine AS builder

WORKDIR /home/app

COPY ./app/package*.json ./

RUN npm install

COPY ./app .

RUN npm run build

# -------- Stage 2: Serve --------
FROM node:21-alpine

RUN npm install -g serve

COPY --from=builder /home/app/dist /home/app/dist

WORKDIR /home/app

CMD ["serve", "-s", "dist", "-l", "3000"]