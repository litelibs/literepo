# literepo

`literepo` is a simple web UI that is used for managing remote repositories

# Developers

This remaining section outlines information for developers that want to contribute to this project

## Testing

`tools/shell/testing/lint.sh` is the script that lints all source code in this repo

```
Usage: lint.sh
```

#### examples

```
$ bash tools/shell/testing/lint.sh
linting './tests/misc/test_is_valid_branch_name.sh'
linting './tools/shell/common/functions.sh'
linting './tools/shell/testing/common/functions.sh'
linting './tools/shell/testing/lint.sh'
linting './tools/shell/run_in_test_container.sh'
linting './.github/workflows/code_testing.yml'
linting './.github/workflows/pr_check.yml'
linting './README.md'
```

#### tools used

- [shellcheck](https://www.shellcheck.net/) is linting all `.sh` files
- [yamllint](https://github.com/adrienverge/yamllint) is linting all '.yml' and '.yaml' files
- [shfmt](https://github.com/mvdan/sh) is checking the formatting of all `.sh` files
- [mdformat](https://pypi.org/project/mdformat/) is checking the formatting of all `README.md` files

#### Docker

[Docker](https://www.docker.com/) can be used for testing on your machine if you are experiencing environment or dependency issues

`tools/shell/run_in_test_container.sh` is the script that execs via containers of [Dockerfile](Dockerfile)

```
Usage: run_in_test_container.sh [expression ...]
```

#### examples

```
$ bash tools/shell/run_in_test_container.sh bash tools/shell/testing/lint.sh
execing 'bash tools/shell/testing/lint.sh' in container '0071d2a584e6'
linting './tests/misc/test_is_valid_branch_name.sh'
linting './tools/shell/common/functions.sh'
linting './tools/shell/testing/common/functions.sh'
linting './tools/shell/testing/lint.sh'
linting './tools/shell/run_in_test_container.sh'
linting './.github/workflows/code_testing.yml'
linting './.github/workflows/pr_check.yml'
linting './README.md'
```

## Git

#### branch naming

Branch names shall contain only lower-case letters, dashes '-', and one of the following prefixes:

- `feat-` for new user-related features that may increment the `<major>` or `<minor>` version of the semver pattern `<major>.<minor>.<patch>`
- `fix-` for user-related bugfixes that may increment the `<patch>` version of the semver pattern `<major>.<minor>.<patch>`
- `devenv-` for developer-related changes, e.g. documentation or testing, that have no direct effect to the user

#### hooks

Check for branch name validity by setting either of your local `.git/hooks/pre-commit` or `.git/hooks/pre-push` hooks with this content:

```
#!/bin/bash

. tools/shell/common/functions.sh

branch_name="$(git branch | grep "^* " | tr '*' ' ' | xargs)"

[[ "$(is_valid_branch_name "$branch_name")" -eq "1" ]] && exit 0

echo >&2 "branch name '$branch_name' does not resemble the required regex pattern (see README)"
exit 1
```

#### pushing to main

Branches will be "squashed" to one commit, using the branch name as the commit message, before being merged into the main branch
