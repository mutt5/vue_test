# Node.js付きのAlpine Linux 3.15ベースのイメージを使用
FROM node:18-alpine as base

FROM base as development

# システムパッケージのアップデートと必要なパッケージのインストール
RUN apk update && \
    apk add --no-cache git bash curl python3 py3-pip libc6-compat openssh-client gnupg

# Python3のシンボリックリンクを確認し、必要に応じて設定
RUN if [ ! -e /usr/bin/python ]; then ln -s python3 /usr/bin/python; fi

# npmのバージョンを固定してインストールし、firebase-toolsもインストール
RUN npm install -g npm@8.19.3 firebase-tools

# Google Cloud CLI のダウンロードとインストール
RUN curl -O https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-470.0.0-linux-x86_64.tar.gz && \
    tar -xf google-cloud-cli-470.0.0-linux-x86_64.tar.gz && \
    rm google-cloud-cli-470.0.0-linux-x86_64.tar.gz && \
    ./google-cloud-sdk/install.sh --quiet --path-update true

# 環境変数の設定
ENV PATH $PATH:/google-cloud-sdk/bin

# 作業ディレクトリの設定
WORKDIR /backend
