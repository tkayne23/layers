#!/bin/bash
source ./config/.env

for i in ./services/* ; do
  if [ -d "$i" ]; then
    echo "installing " $(basename $i)
    cd $i
      npm install
    cd - > /dev/null
  fi
done
