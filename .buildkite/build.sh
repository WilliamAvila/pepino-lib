#!/bin/bash

set -eo pipefail
echo "--- Set Node Version"
. "$NVM_DIR/nvm.sh"
nvm current
nvm use 4
echo "--- Install Dependencies"
npm install -g gulp
npm install
npm update
echo "--- Build And Test"
gulp
