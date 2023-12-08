# syntax=docker/dockerfile:1

FROM amd64/node:16.20.1-bookworm
WORKDIR /app
# RUN apk --no-cache add --virtual .builds-deps build-base python3

RUN apt-get update -yq \
&& apt-get install python3-pip -yq

# # Create app directory


# RUN pip3 --version

# RUN pip3 install --upgrade pip


# RUN pip3 install -U vosk 

# RUN npm install vosk -g


ENV NODE_ENV=development


COPY ["package.json", "yarn.lock*", "./"]

# COPY package.json yarn.lock ./

COPY . /app

RUN yarn install