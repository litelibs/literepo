#!/bin/bash

. tools/shell/testing/common/functions.sh
. tools/shell/common/functions.sh

function run_test() {
	local exit_code_expected="$1"
	local branch_name="$2"
	local exit_code_actual

	echo "testing branch name '$branch_name'"

	exit_code_actual="$(is_valid_branch_name "$branch_name")"

	[[ "$exit_code_actual" -eq "$exit_code_expected" ]] || exit_err_test_fail
}

function check_sources() {
	check_sourced_functions || exit 1
	check_sourced_functions_testing || exit_err
}

function main() {
	local msg

	check_sources

	msg="is_valid_branch_name tests"

	echo "${msg} starting..."

	run_test 1 "feat-CW-123-some-new-feature-branch"
	run_test 1 "fix-CW-0-branch-for-a-bugfix"
	run_test 1 "devenv-CW-9-a-branch-for-dev-setup-stuff"
	run_test 0 "devenv-CW-jira-ticket-number-missing"
	run_test 0 "devenv-CWO-9-wrong-jira-project"
	run_test 0 "feature-CW-3-invalid-prefix"
	run_test 0 "numbers-CW-55-in-branch-names-are-2-be-denied"
	run_test 0 "feat-CW-9-slashes/are-not/allowed"
	run_test 0 "devenv-CW-10-NoCapital-letters"
	run_test 0 "CW-1234"

	echo "${msg} passed!"
}

main
