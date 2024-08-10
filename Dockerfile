FROM node:20-alpine

WORKDIR /user/src/app

COPY . .
RUN npm install
RUN DATABASE_URL=$DATABASE_URL npx prisma generate
RUN DATABASE_URL=$DATABASE_URL npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]