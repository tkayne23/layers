#!/bin/bash
source ./config/.env

cd ./services/$1
sls invoke local -f $2 -p $3
