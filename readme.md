# External URL opener

## Introduction
This application allows you to open an external tab from a BigID App. By default this app will redirect to bigid.com, but the url can be changed in the app parameters.

This application uses the following technologies:
- NodeJS
- TypeScript
- Gulp (for build management)
- Express (web server)
- Docker (for packaging)

## Prerequisites


## File Structure

- **/**
  - Dockerfile - Contains the docker instructions to turn the application into a Docker container
  - gulpFile.js - Contains the build instructions for the application
  - package.json - Contains the list of third party dependencies for this project
  - tsconfig.json - Contains the TypeScript settings for this project.
  - **/app** - The backend files for the app
  - **/config** - The configuration files for the app
  - **/public** - The UI for the app

## Running App

This application can be run as a Docker image by building it with `gulp image` or by running it directly with `gulp develop`.