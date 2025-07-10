# minikit-room

## Run locally

### Frontend

Run

```bash
yarn run dev:frontend
```

### Backend

Create .env file with following properties

```
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=
```

Run

```bash
yarn run dev:backend
```

### Database

Setup with docker

```bash
# declare $PASSWORD before
docker run --name mkr-db -e MYSQL_ROOT_PASSWORD=$PASSWORD -e MYSQL_DATABASE=mkr-db -p 3306:3306 -d mysql:9.3
```
