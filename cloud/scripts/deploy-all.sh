#!/bin/bash
source ./config/.env

for i in ./services/* ; do
  if [ -d "$i" ]; then
    echo "deploying " $(basename $i)
    cd $i
      npm install
      sls deploy
    cd - > /dev/null
  fi
done
