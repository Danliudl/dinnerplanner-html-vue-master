<template>
  <div class="PrintRecipe">
    <topbar :model="this.model"/>

    <div class="recipe-item row" v-for="dish in selectDishes" :key="dish.id">
      <div class="dishImg col-md-2">
        <img :src="dish.image" class="img-rounded">
      </div>
      <div class="dishIntro col-md-5">
        <h3>{{dish.title}}</h3>
        <p>{{dish.instructions}}</p>
      </div>
      <div class="dishPrepara col-md-5">
        <h4>Preparation</h4>
        <p>{{dish.instructions}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Topbar from "@/components/Topbar";

export default {
  props: ["model"],

  components: {
    topbar: Topbar
  },

  // we define and initalise the data we want to use and modify in the component
  data() {
    return {
      numberOfGuests: this.model.getNumberOfGuests(),
      selectDishes: this.model.getSelectDishes(),
      totalPrice: this.model.setTotalPrice()
    };
  }
};
</script>

<style scoped>
.recipe-item {
    margin-bottom: 10%;
        display: block;
        padding: 0 5%;
        box-sizing: border-box;

}

.row {
    margin: 0;
    display: block;
    padding-bottom: 10%;

}

.col-md-2 {
    width: 16.666666666666664%;
        position: relative;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
        box-sizing: border-box;
}

.col-md-5 {
    width: 41.66666666666667%;
    float: left;
        position: relative;
    min-height: 1px;
    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
}

img {
    width: 100%;
        float: left;
}

h3 {
    margin-top: 10px;
}

button {
  display: block;
  margin: 2em auto;
  padding: 10px 16px;
  font-size: 15px;
  line-height: 1.33;
  border-radius: 6px;
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
</style>

