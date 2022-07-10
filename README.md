# vezdekod-web

Категория: **Web**.

Стек технологий: ReactJS, Express, VKUI.

## Установка и запуск

TLDR: если имеете докер 

```bash
 $ docker-compose up --build -d
```

Сервис будет доступен на http://localhost:3000 (API на http://localhost:5000).

P.S. Стартовал на node v14.8, должно стартануть и на более свежей, но не проверял.

### Запуск отдельно бекенда

```bash
 # опционально можно сменить порт
 $ export PORT=5000

 $ npm install
 $ npm start
```

Сервис читает `large.json`, можно поменять в файле `server/routes/index.js`.

Сервис хранит данные только в оперативной памяти.

### Запуск отдельно фронтенда

```bash
 # можно сменить адрес бекенда переменной окружения
 $ export REACT_APP_API_ADDRESS=http://localhost:5000

 $ npm install --legacy-peеr-deps
 $ npm start
```

## Для связи

Если возникнут вопросы: [@somnoynadno](https://t.me/somnoynadno)
