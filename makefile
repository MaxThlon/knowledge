nginx_debug_path=/srv/nginx/knowledge

build:
	ng build

build_speed_up:
	ng build --source-map=false

deploy_macmax:
	ssh -C max@macmax "rm -Rf $(nginx_debug_path)/*"
	scp -Cr ./dist/knowledge/* max@macmax:$(nginx_debug_path)

build_deploy_macmax: build deploy_macmax

build_speed_up__deploy_macmax: build_speed_up deploy_macmax
