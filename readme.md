# 環境構築ガイド

このドキュメントでは、`vue_test` プロジェクトの `frontend`（Vue.js）と `backend`（Firebase Functions）の環境構築およびデプロイ手順を説明します。

---

## **1. Docker イメージの作成**

`vue_test` ディレクトリ直下で、以下のコマンドを実行し、コンテナをビルド・起動します。

```sh
docker compose up -d --build
```

---

## **2. Frontend 環境構築**

### **2.1 コンテナに入る**

`vue_test/frontend` ディレクトリ直下で、以下のコマンドを実行し、`frontend` コンテナに入ります。

```sh
docker compose exec frontend /bin/sh
```

### **2.2 ライブラリのインストール**

コンテナ内で `npm install` を実行し、必要なパッケージをインストールします。

```sh
npm i
```

### **2.3 開発サーバーの起動**

開発サーバーを起動し、`http://localhost:5173` でアプリを確認できます。

```sh
npm run dev
```

---

## **3. Backend 環境構築**

### **3.1 コンテナに入る**

`vue_test/backend` ディレクトリ直下で、以下のコマンドを実行し、`backend` コンテナに入ります。

```sh
docker compose exec backend /bin/bash
```

### **3.2 Python 仮想環境の作成とライブラリのインストール**

`backend/functions` ディレクトリ直下で、以下のコマンドを実行し、Python 仮想環境を作成し、依存ライブラリをインストールします。（10分程度かかります）

```sh
python -m venv venv && . venv/bin/activate && pip install -r requirements.txt
```

---

## **4. Backend のデプロイ（Cloud Functions）**

### **4.1 Firebase にログイン**

コンテナ内で Firebase CLI にログインします。

```sh
firebase login --no-localhost
```

> `--no-localhost` は、コンテナ内で Firebase CLI を使用する場合に必要です。  
> ブラウザでログインリンクが表示されるので、指示に従って認証を完了してください。

### **4.2 Google アカウントに紐づくプロジェクトを確認**

Firebase のプロジェクト一覧を表示し、適切なプロジェクト ID を確認します。

```sh
firebase projects:list
```

### **4.3 プロジェクトを選択**

デプロイ対象のプロジェクトを指定します。

```sh
firebase use {Project ID}
```

（例）

```sh
firebase use vue-test
```

### **4.4 Cloud Functions のデプロイ**

以下のコマンドで Cloud Functions をデプロイします。

```sh
firebase deploy --only functions
```

---

## **5. Frontend のデプロイ（Firebase Hosting）**

### **5.1 Firebase にログイン**

コンテナ内で Firebase CLI にログインします。

```sh
firebase login --no-localhost
```

### **5.2 本番用ビルドの作成**

Firebase Hosting にデプロイする前に、本番用のビルドを作成します。

```sh
npm run build
```

### **5.3 Firebase Hosting のデプロイ**

ビルドが完了したら、以下のコマンドを実行し、`frontend` を Firebase Hosting にデプロイします。

```sh
firebase deploy --only hosting
```

### **5.4 デプロイされたアプリを確認**

デプロイ後、以下の URL でアプリを確認できます。

```
https://{Project ID}.web.app
```

---
