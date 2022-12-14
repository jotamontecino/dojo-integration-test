install:
	@podman run -it --rm -v "$(PWD)/server":/usr/src/app trashnochados/nodejs:raw-node16 yarn
	@cp ./server/.env.sample ./server/.env
lint:
	@podman run -it --rm -v "$(PWD)/server":/usr/src/app trashnochados/nodejs:raw-node16 yarn lint
ut:
	@podman run -it --rm -v "$(PWD)/server":/usr/src/app trashnochados/nodejs:raw-node16 yarn unit-test
it:
	@podman run -it --rm -v "$(PWD)/server":/usr/src/app trashnochados/nodejs:raw-node16 yarn unit-test
start:
	@podman run -it --rm -p 9003:9003 -v "$(PWD)/server":/usr/src/app trashnochados/nodejs:raw-node16 yarn start
watch:
	@podman run -it --rm -p 9003:9003 -v "$(PWD)/server":/usr/src/app trashnochados/nodejs:raw-node16 yarn start:dev
