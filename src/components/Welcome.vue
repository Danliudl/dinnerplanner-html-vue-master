<template>
  <div class="welcome">
    <p>
      {{ msg }}
    </p>

    <router-link to="/search">
      <button>Creat new dinner</button>
    </router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        msg: 'We serve during both lunch and dinner. Here you will find sushi, Thai dishes, Chinese Dim Sum and other hot and cold Asian specialties. It is simply a dazzling Asian smorgasbord! Of course, it is also good to order from our à la carte menu during the evening.'
      }
    }
  }
</script>

<!-- Example of styling Vue components -->
<!-- With the scoped attribute, CSS will apply to elements of the current component only -->
<style scoped>
  .welcome {
    padding: 10%;
    text-align: center;
    font-size: 2em;
  }

  button {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.33;
    border-radius: 6px;
    color: #fff;
    background-color: #f0ad4e;
    border-color: #eea236;
  }
</style>
