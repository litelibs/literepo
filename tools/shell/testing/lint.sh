#!/bin/bash

. tools/shell/common/functions.sh

function check_args() {
	local argv_0="$1"
	local argv_1="$2"
	local flag_help
	local flag_docker
	local usage_msg

	flag_help="--help"
	flag_docker="--docker"
	usage_msg="Usage: $(basename "$argv_0") [$flag_help|$flag_docker]"

	[ -z "$argv_1" ] && return

	[ "$argv_1" == "$flag_help" ] && echo "$usage_msg" && exit
	[ "$argv_1" == "$flag_docker" ] && return
	echo >&2 -e "${usage_msg}\ninvalid arg '$argv_1'"
	exit_err
}

function lint_sh() {
	local path

	for path in $(find . | grep "\.sh$"); do
		echo "linting '$path'"
		shfmt --diff "$path" || exit_err
		shellcheck "$path" || exit_err
	done
}

function check_sources() {
	check_sourced_functions || exit 1
}

function run() {
	local argv_0="$1"
	local argv_1="$2"

	check_args "$argv_0" "$argv_1"

	check_sources

	if [ "$argv_1" == "--docker" ]; then
		run_in_test_container "$argv_0" || exit_err
		exit 0
	fi

	lint_sh
}

run "$0" "$1"
