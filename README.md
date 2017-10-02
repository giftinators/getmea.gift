# 🎁 GetMeA.Gift

// Use Ross's content //

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes. See Deployment for notes on how to deploy the project to Heroku.

## Installing

Install all dependencies with one command.
```
npm run setup
```

## Running for development

This will start the client at http://localhost:3000 which will proxy the api server that is running at http://localhost:3001. The proxy will allow you to make ajax requests to a relative url (such as '/api/hello') from the client and it will route that request to the api server. This proxy only runs during development.
```
npm start
```
## API Routes

Download all routes via PostMan templates:
https://www.getpostman.com/collections/9ad0efc37db5dccc7682
