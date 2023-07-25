#!/bin/bash

function exit_err() {
	echo >&2 "error: $(caller)"
	exit 1
}

# used to verify the contents of this file have been sourced
function check_sourced_functions() {
	:
}
