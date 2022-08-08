# Welcome to the Anythink Market repo

To start the app use Docker. It will start both frontend and backend, including all the relevant dependencies, and the db.

Please find more info about each part in the relevant Readme file ([frontend](frontend/readme.md) and [backend](backend/README.md)).

## Development

When implementing a new feature or fixing a bug, please create a new pull request against `main` from a feature/bug branch and add `@vanessa-cooper` as reviewer.

## First setup

* Step 1 - Clone this repository:
    ```shell
    git clone git@github.com:ObelusFamily/Anythink-Market-btvep.git
    ```

* Step 2 - [Install Docker](https://docs.docker.com/get-docker/)
Verify by running 
    ```shell
    docker -v
    docker-compose -v
    ```
* Step 3 - Start the container (from the root folder):
    ```shell
    docker-compose up
    ```
* Step 4 - Verify backend is up by receving a ping response from: [http://localhost:3000/api/ping](http://localhost:3000/api/ping)

* Step 5 - Verify frontend by creating a user at: [http://localhost:3001/register](http://localhost:3001/register)
* 

