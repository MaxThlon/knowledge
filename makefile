nginx_debug_path=work/thlon/knowledge/docker/nginx/knowledge

build:
	ng build

build_speed_up:
	ng build --source-map=false

deploy_nginx:
	rm -Rf $(nginx_debug_path)/*
	cp ./dist/knowledge/* $(nginx_debug_path)

deploy_macmax:
	ssh -C max@macmax "rm -Rf $(nginx_debug_path)/*"
	scp -Cr ./dist/knowledge/* max@macmax:$(nginx_debug_path)


build_deploy_nginx: build deploy_nginx

build_deploy_macmax: build deploy_macmax

build_speed_up__deploy_macmax: build_speed_up deploy_macmax
