#!/bin/bash
source ./config/.env

cd ./services/$1
sls invoke -f $2
