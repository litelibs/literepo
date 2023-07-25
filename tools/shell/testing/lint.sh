#!/bin/bash

. tools/shell/common/functions.sh

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

function main() {
	check_sources

	lint_sh
}

main
