# draw-apart
This project and this readme are a work in progress and is currently not built or intended to be reproduced easily. Full testing tools and mock backends will be included before completion.

A VueJS game with a firebase backend based on a paper game sometimes known as "The combination man". The traditional "combination man" paper game, players take turns drawing one part of the human body, starting with the head. When finished drawing their part the player folds the page back so that the next player can't see whats already been drawn. In our web based version each player draws ech part once. After drawing, each player gets the chance to create a combination of all parts. Finally, all players vote on their favourite.
## Project Requirements
* NodeJS v12.16.2 - https://nodejs.org/en/
* yarn or npm

## Project setup
1. Clone the repo.
2. Create .env files
Create two files in the root of the project .env.development.local and .env.production.local as follows:
#### .env.development.local
```
VUE_APP_FIREBASE_API_KEY=""
VUE_APP_FIREBASE_AUTH_DOMAIN=""
VUE_APP_FIREBASE_DATABASE_URL=""
VUE_APP_FIREBASE_FUNCTIONS_URL=""
VUE_APP_FIREBASE_PROJECT_ID=""
VUE_APP_FIREBASE_STORAGE_BUCKET=""
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=""
VUE_APP_FIREBASE_APP_ID=""
VUE_APP_FIREBASE_MEASUREMENT_ID=""
VUE_APP_DEBUG="true"
```
#### .env.production.local
```
VUE_APP_FIREBASE_API_KEY=""
VUE_APP_FIREBASE_AUTH_DOMAIN=""
VUE_APP_FIREBASE_DATABASE_URL=""
VUE_APP_FIREBASE_FUNCTIONS_URL=""
VUE_APP_FIREBASE_PROJECT_ID=""
VUE_APP_FIREBASE_STORAGE_BUCKET=""
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=""
VUE_APP_FIREBASE_APP_ID=""
VUE_APP_FIREBASE_MEASUREMENT_ID=""
```
3. Create firebase acount
This app uses a firebase realtime database and cloud functions as its backend. You will need to create an account and set these up first.

Populate the production .env file with the details from your firebase project.

4. Download a service account credentials json file.
Go to service accounts in firebase and download the credentials json file and place it in the root of your project. This will be used to configure the local firebase emulators.

5. Configure firebase for local emulation

```
yarn install
```

### Firebase backend
This project currently requires a firebase backend. A miragejs mock backend will be included.

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
