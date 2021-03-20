#!/bin/bash
echo "do you have a postgres contianer running already? [y/n]"
read input
if [[ $input == "y" ]]; then
    echo "do you want to copy the migrations? [y/n]"
    read input2
    if [[ $input2 == "y" ]]; then
        docker exec -i pg_container psql -U postgres sirate < ./backend/migrations.sql
        echo "contaner successfully made run the following to execute sql server: docker exec -it pg_container psql -U postgres sirate"
    fi
else
    echo "p[ease enter a password for the container"
    read pword
    docker run --name pg_container -p 5432:5432 -e POSTGRES_PASSWORD=$pword -e POSTGRES_USER=postgres -e POSTGRES_DB=sirate -d postgres
    docker exec -i pg_container psql -U postgres sirate < ./backend/migrations.sql
fi

