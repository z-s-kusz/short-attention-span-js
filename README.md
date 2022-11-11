# sas-js

### Project Features Tracker
[Trello board](https://trello.com/b/oGoAIsZA/sas-js).

## Project setup
```
nvm use
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


# .env setup
No secrets here!

For local testing I have a dot env file that has:
```
VUE_APP_POETRY_BASE_URL=http://localhost:9999/.netlify/functions
```
# netlify functions
See [netlify docs](https://docs.netlify.com/functions/overview/).

Need netlify cli to test locally.
CLI has been added to the dev dependencies.
It doesn't seem possible to use the local version though if it has been installed globally :/

Authenticate with
```
netlify login
```

To opt out of tracking:
```
netlify --telemetry-disable
```

To serve functions locally with debug enabled:
```
NODE_OPTIONS=--inspect netlify functions:serve
```
