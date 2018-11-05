FROM ruby:2.5.3

ENV LANG=C.UTF-8
ENV TZ=America/Sao_Paulo

RUN apt-get update -qq \
  && apt-get install -y \
  libpq5 \
  libpq-dev \
  && apt-get clean

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /bundle
ENV BUNDLE_PATH=/bundle

RUN mkdir -p /app

COPY . /app
WORKDIR /app
