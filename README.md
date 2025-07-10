# minikit-room

## Database

Setup with docker

```bash
# declare $PASSWORD before
docker run --name mkr-db -e MYSQL_ROOT_PASSWORD=$PASSWORD -e MYSQL_DATABASE=mkr-db -p 3306:3306 -d mysql:9.3
```
