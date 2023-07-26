FROM alpine:3.16.2 as testing
RUN \
  apk add \
    bash~=5 \
    yamllint~=1 \
    shellcheck~=0 \
    shfmt~=3 \
    py3-pip~=22 \
    colordiff~=1 \
    git~=2
RUN pip install \
  mdformat==0.*
ARG CW_TESTING_WORKDIR_PATH
RUN git config --global --add safe.directory $CW_TESTING_WORKDIR_PATH
WORKDIR $CW_TESTING_WORKDIR_PATH
