FROM alpine:3.16.2 as testing
RUN \
  apk add \
    bash~=5 \
    git~=2 \
    shellcheck~=0 \
    shfmt~=3
ARG CW_TESTING_WORKDIR_PATH
RUN git config --global --add safe.directory $CW_TESTING_WORKDIR_PATH
WORKDIR $CW_TESTING_WORKDIR_PATH
