include .env

create_db:
	docker run --name sleepr-mongo -p ${MONGO_PORT}:${MONGO_PORT} -e MONGO_INITDB_ROOT_USERNAME=${MONGO_LOGIN} -e MONGO_INITDB_ROOT_PASSWORD=${MONGO_PASSWORD} -d mongo:7.0