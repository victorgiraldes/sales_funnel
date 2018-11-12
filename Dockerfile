FROM ruby:2.5.3

ENV LANG=C.UTF-8
ENV TZ=America/Sao_Paulo

# Add sources for Node 10, Yarn and Chrome
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
  && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
  && curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add \
  && echo "deb [arch=amd64]  http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list

RUN apt-get update -qq \
  && apt-get install -y \
  libpq5 \
  libpq-dev \
  nodejs \
  yarn \
  google-chrome-stable \
  && apt-get clean

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /bundle
ENV BUNDLE_PATH=/bundle

RUN mkdir -p /app

COPY . /app
WORKDIR /app

