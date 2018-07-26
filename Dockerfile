
FROM node:9

RUN mkdir /src


WORKDIR /src

COPY ./package.json /src/package.json
COPY ./package-lock.json /src/package-lock.json
RUN npm install --silent


COPY ./ /src

ENV NODE_ENV development


EXPOSE 3000

CMD node server