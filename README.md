# 🎁 GetMeA.Gift

The project utilizes [express-create-react-app-starter](https://github.com/rosswaycaster/express-create-react-app-starter) to easily bootstrap a React app served up with Express. Also uses [custom-react-scripts](https://github.com/kitze/custom-react-scripts) to add optional support for ES6 decorators, SASS/SCSS, LESS, Stylus, & CSS modules without needing to eject out of Create React App.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

## ENV Variables

Rename `sample-env.env` to `env.env` and set `MONGODB_URI` to the url of your MongoDB. (We suggest using a free [mLab Sandbox database](https://www.mlab.com))

## Installing

Install all dependencies with one command. You'll also need to run this anytime someone adds a new dependency.
```
npm run setup
```

## Dependencies

- Server Side Dependencies should go in `./package.json`
- Client Side Dependencies should go in `./client/package.json`

Again, after adding new dependencies `npm run setup` will run `npm install` for both the server and client.

## Running for development

This will start the client at http://localhost:3000 which will proxy the api server that is running at http://localhost:3001. The proxy will allow you to make ajax requests to a relative url (such as '/api/users') from the client and it will route that request to the api server for you. This proxy only runs during development.
```
npm start
```
