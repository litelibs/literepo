#!/bin/bash

. tools/shell/common/functions.sh
. tools/shell/testing/common/functions.sh

function lint_sh() {
	local path

	for path in $(git ls-files | grep "\.sh$"); do
		echo "linting '$path'"
		shfmt --diff "$path" || exit_err
		shellcheck "$path" || exit_err
	done
}

function lint_yml() {
	local path

	for path in $(git ls-files | grep "\.yml$\|\.yaml$"); do
		echo "linting '$path'"
		yamllint --strict "$path" || exit_err
	done
}

function lint_md() {
	local path
	local path_temp

	for path in $(git ls-files | grep "\.md$"); do
		echo "linting '$path'"
		if mdformat --check "$path"; then continue; fi
		path_temp="$(get_temp_path "$path")"
		cp "$path" "$path_temp"

		mdformat "$path_temp"

		colordiff "$path" "$path_temp"
		rm "$path_temp"
		exit_err
	done
}

function check_sources() {
	check_sourced_functions || exit 1
	check_sourced_functions_testing || exit_err
}

function main() {
	check_sources

	npm install || exit_err
	npm run format || exit_err
	npm run lint || exit_err
	lint_sh
	lint_yml
	lint_md
	echo "all linting passed!"
}

main
