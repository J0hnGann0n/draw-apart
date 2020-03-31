import { Server, Model } from 'miragejs'

export function makeServer({ environment = "development" } = {}) {

  let server = new Server({
    environment,

    models: {
      game: Model,
    },

    seeds(server) {
      server.create("game", {
        code: "abcd",
        players: ["john", "mirjam"],
        state: "lobby"
      }),
        server.create("game", {
          code: "bcde",
          players: ["bob", "tom"],
          state: "play"
        })
    },

    routes() {

      this.namespace = "api"

      this.get("/game/:code", (schema, request) => {
        let code = request.params.code
        return schema.games.findBy({ code: code })
      })
    },
  })

  return server
}