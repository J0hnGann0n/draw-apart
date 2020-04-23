#!/bin/bash
export FUNCTIONS_ENV="development"
export FUNCTIONS_DATABASE_URL="http://localhost:9000?ns=drawapart-84b66"
export FUNCTIONS_SERVICE_FILE="../drawapart-84b66-firebase-adminsdk-wq5pu-518e4e491f.json"
# export DATABASE_URL="http://localhost:9000?ns=drawapart-84b66"
firebase emulators:start
