<template>
  <div class="DinnerInfo">
    <topbar :model="this.model"/>

    <div class="dinnerinfoview">
      <div class="dish-list row">
        <div class="dish-item col-md-3" v-for="dish in selectDishes" :key="dish.id">
          <img class="dish-img" :src="dish.image">
          <div class="dish-name">{{dish.title}}</div>
          <div class="dish-price">{{dish.pricePerServing}}SEK</div>
        </div>

        <div class="dish-item total-item col-md-3">
          <div class="dish-name">Total:</div>
          <div class="dish-price">{{totalPrice.toFixed(2)}}&nbsp;SEK</div>
        </div>
      </div>

      <div class="printRecipe">
        <router-link to="/printRecipe" tag="button">Print Full Recipe</router-link>
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
.dinnerinfoview {
  padding: 0 5%;
  display: block;
}

.dish-list {
  width: 100%;
  text-align: center;
  min-height: 450px;
  height: auto !important;
}

.row {
  margin: 0;
  box-sizing: border-box;
  display: block;
}

.col-md-3 {
  width: 20%;
  float: left;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
}

.dish-list .dish-item .dish-img {
  width: 100%;
  height: 100%;
  border: 1px solid #333;
}

.dish-price {
  color: #660000;
  font-weight: bold;
  text-align: right;
  padding: 0.5em 0;
}

.dish-list .dish-item {
  margin-bottom: 5%;
  text-align: center;
}

.total-item {
  padding-top: 20%;
  font-size: 30px;
  border-left: 1px solid #ccc;
}

.total-item .dish-name {
  background: #fff;
  border: 0;
  text-align: left;
}

.total-item .dish-price {
  text-align: left;
}

.printRecipe {
  display: block;
  padding-top: 5em;
  text-align: center;
  border-top: 2px solid #ccc;
}

button {
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

