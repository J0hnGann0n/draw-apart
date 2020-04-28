<template>
  <div class="content container">
    <div class="row">
      <div class="col-12">
        <h1>Waiting for the other players</h1>
      </div>
      <div class="col-12">
        <img :src="src" width="100%" />
        <img src="../../public/img/giphylogo.png" width="100px" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../services/axios";
export default {
  name: "Play",
  data() {
    return {
      src: ""
    };
  },
  created() {
    // Make a request for a user with a given ID
    axios
      .get(
        "https://api.giphy.com/v1/gifs/trending?api_key=" +
          process.env.VUE_APP_GIPHY_API_KEY +
          "&limit=25&rating=G"
      )
      .then(response => {
        const gifNumber = Math.floor(Math.random() * Math.floor(25));
        this.src = response.data.data[gifNumber].images.downsized_medium.url;
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
