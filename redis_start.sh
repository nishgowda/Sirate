#!bin/bash

echo "do you want to make a redis container? [y/n]"
read input
if [[ $input == "y" ]]; then
   docker run --name redis-server -d redis
   echo "redis docker container was succesfully made"
else
    echo "Then why are you running me :("
fi
