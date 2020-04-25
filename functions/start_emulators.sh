#!/bin/bash
envVariables=()
config=()

# Read vue app .env file and populate new array with the keys prefixed with vue., in lower case and with qoutes removed.
while read line || [ -n "$line" ]; do envVariables+=( "$line" ); done < "../.env.development.local"
for u in "${envVariables[@]}"
do
    trimmed=$(echo "$u" | tr -d '"') # Remove inverted commas
    config+=(vue.${trimmed,,})
done
# Load parsed configs from vue .env file into firebase functions config
firebase functions:config:set "${config[@]}"
firebase functions:config:get > .runtimeconfig.json 
firebase emulators:start
