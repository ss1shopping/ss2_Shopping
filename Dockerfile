FROM node:12.16-alpine

WORKDIR /app/
ADD package.json .
RUN yarn install --production=true
ADD  . .

CMD [ "yarn", "start" ]
EXPOSE 3000