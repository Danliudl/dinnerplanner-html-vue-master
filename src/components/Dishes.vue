<template>
  <div class="Dishes">

    <em v-if="status === 'LOADING'">Loading...</em>
    <b v-else-if="status === 'ERROR'">Failed to load data, please try again</b>
    <div v-else>
      <div>
        <router-link
          :to="{name:'DishDetails',params:{id:dish.id}}"
          class="dish-item col-md-3"
          v-for="dish in dishes"
          :key="dish.id"
        >
          <img class="dish-img" :src="baseUri+dish.imageUrls[0]" width="100%">
          <span class="dish-name">{{ dish.title }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// Alternative to passing the moderl as the component property,
// we can import the model instance directly
export default {
  props: {
    status: {
      type: String,
      default: "LOADING"
    },
    dishes: {
      type: Array,
      default() {
        return{ dishes:'' }
      }
    },
    baseUri: {
      type: String,
      default: ''
    }
  },


};
</script>

<style scoped>
.Dishes {
  margin-top: 3em;
  width: 100%;
}

.dish-item {
  cursor: pointer;
  margin-bottom: 5%;
  text-align: center;
}

.col-md-3 {
  width: 22%;
  float: left;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
}

.dish-item .dish-img {
  width: 100%;
  height: 100%;
  border: 1px solid #333;
}

.dish-item .dish-name {
  display: block;
  border: 1px solid #333;
  border-top: 0;
  background: #eee;
  padding: 0.5rem 0;
  font-weight: bold;
}
</style>
