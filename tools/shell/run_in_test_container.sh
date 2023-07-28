#!/bin/bash

. tools/shell/common/functions.sh

function build_test_container() {
	local image_tag_name="$1"
	local workdir_path="$2"

	DOCKER_BUILDKIT=1 docker build \
		. \
		--tag "$image_tag_name" \
		--target "testing" \
		--build-arg CW_TESTING_WORKDIR_PATH="$workdir_path" ||
		exit_err
}

function run_test_container() {
	local image_tag_name="$1"
	local workdir_path="$2"
	local container_id
	local container_name
	local container_status

	container_name="$(cut -d':' -f1 <<<"$image_tag_name")"
	container_id="$(docker ps -aqf "name=^${container_name}$")" || exit_err

	if [ -n "$container_id" ]; then
		container_status="$(docker container inspect -f '{{.State.Status}}' "$container_id")" || exit_err
		[ "$container_status" == "running" ] && echo "$container_id" && return
		docker start "$container_name" || exit_err
		return
	fi

	container_id="$(
		docker run \
			--workdir "$workdir_path" \
			--interactive \
			--tty \
			--detach \
			--name "$container_name" \
			"$image_tag_name" ||
			exit_err
	)" || exit_err

	docker exec \
		"$container_id" \
		git init >/dev/null || exit_err

	echo "$container_id"
}

function run_in_test_container() {
	local exec_str="$1"
	local image_tag_name
	local workdir_path
	local container_id
	local path

	image_tag_name="cw-testing:1"
	workdir_path="/cw_testing"

	if [ -z "$(docker images -q "$image_tag_name")" ]; then
		build_test_container "$image_tag_name" "$workdir_path" || exit_err
	fi

	container_id="$(run_test_container "$image_tag_name" "$workdir_path")" || exit_err

	for path in $(git ls-files | cut -d'/' -f1 | sort | uniq); do
		docker cp "$path" "${container_id}:${workdir_path}"
	done

	echo "execing '$exec_str' in container '$container_id'"

	docker exec --tty "$container_id" git add . || exit_err
	# shellcheck disable=SC2086 # reason: the exec str may have args
	docker exec --tty "$container_id" ${exec_str} || exit_err
}

function check_sources() {
	check_sourced_functions || exit 1
}

function main() {
	local exec_str="$*"

	check_sources

	run_in_test_container "$exec_str"
}

main "$@"
