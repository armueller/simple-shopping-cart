# Shopping Cart

## Requirements

- Docker

## Running the container

`docker run --rm -d -e MONGO_USER=<username> -e MONGO_PASS=<password> -p "4200:4200" -p "3000:3000" --name au_assignment au_assignment`

## Viewing the application

After the image has downloaded and started running, you may need to wait a minute or two for the Angular application to compile and run.  Once it is running, you will be able to view the application by navigating to [localhost](http://localhost:4200).
