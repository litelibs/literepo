#!/bin/bash

function exit_err() {
	echo >&2 "error: $(caller)"
	exit 1
}

function is_valid_branch_name() {
	local branch_name="$1"

	if grep "^\(feat\|fix\|devenv\)-CW-[0-9]\+-[a-z-]\+$" <<<"$branch_name" >/dev/null; then
		echo 1
		return
	fi

	echo 0
}

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

	container_name="$image_tag_name"
	container_id="$(docker ps -aqf "name=^${container_name}$")" || exit_err

	if [ -n "$container_id" ]; then
		container_status="$(docker container inspect -f '{{.State.Status}}' "$container_id")" || exit_err
		[ "$container_status" == "running" ] && echo "$container_id" && return
		docker start "$container_name" || exit_err
		return
	fi

	docker run \
		--workdir "$workdir_path" \
		--interactive \
		--tty \
		--detach \
		--name "$container_name" \
		"$image_tag_name" ||
		exit_err
}

function run_in_test_container() {
	local exec_str="$1"
	local image_tag_name
	local workdir_path
	local container_id
	local path

	image_tag_name="cw-testing"
	workdir_path="/cw_testing"

	if [ -z "$(docker images -q "$image_tag_name")" ]; then
		build_test_container "$image_tag_name" "$workdir_path" || exit_err
	fi

	container_id="$(run_test_container "$image_tag_name" "$workdir_path")" || exit_err

	for path in $(git ls-files | cut -d'/' -f1 | sort | uniq); do
		docker cp "$path" "${container_id}:${workdir_path}"
	done

	echo "execing '$exec_str' in container '$container_id'"

	# shellcheck disable=SC2086 # reason: the exec str may have args
	docker exec --tty "$container_id" bash ${exec_str} || exit_err
}

# used to verify the contents of this file have been sourced
function check_sourced_functions() {
	:
}
