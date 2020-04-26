# draw-apart
This project and this readme are a work in progress and is currently not built or intended to be reproduced easily. Full testing tools and mock backends will be included before completion.

A VueJS game based on a paper game sometimes known as "The combination man". The traditional "combination man" paper game, players take turns drawing one part of the human body, starting with the head. When finished drawing their part the player folds the page back so that the next player can't see whats already been drawn. In our web based version each player draws ech part once. After drawing, each player gets the chance to create a combination of all parts. Finally, all players vote on their favourite.
## Project Requirements
* NodeJS v12.16.2 - https://nodejs.org/en/

## Project setup
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
