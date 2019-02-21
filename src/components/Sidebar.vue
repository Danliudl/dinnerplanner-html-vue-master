<template>
  <div class="sidebar">
    <h2>My Dinner</h2>
    <div class="peopleNum">
      <p>
        People:
        <input
          type="number"
          :value="numberOfGuests"
          @input="onDidChangeNumberOfGuests"
          @change="onDidChangeNumberOfGuests"
        >
        <br>
        Total number of guests: {{ numberOfGuests }}
      </p>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Dish Name</th>
            <th class="text-right">Cost</th>
          </tr>
          <tr></tr>
        </thead>
        <tbody>
          <tr v-for="dish in selectDishes" :key="dish.id">
            <td>{{dish.title}}</td>
            <td class="text-right">{{(dish.pricePerServing*numberOfGuests).toFixed(2)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="price">
      SEK&nbsp;&nbsp;&nbsp;
      <span class="num">{{totalPrice.toFixed(2)}}</span>
    </p>

     <router-link class="routerlink" to="/dinnerinfo" tag="button" v-if="selectDishes.length > 0">Confirm dinner</router-link>
     <button v-else>Confirm dinner</button> 
    
  </div>
</template>

<script>
export default {
  props: ["model"],
  // this methods is called by React lifecycle when the
  // component is created that's a good place to setup model observer
  created() {
    this.model.addObserver(this);
  },

  // this is called when component is removed destroyed
  // good place to remove observer
  beforeDestroy() {
    this.model.removeObserver(this);
  },

  // we define and initalise the data we want to use and modify in the component
  data() {
    return {
      numberOfGuests: this.model.getNumberOfGuests(),
      selectDishes: this.model.getSelectDishes(),
      totalPrice: this.model.setTotalPrice(),
    };
  },

  methods: {
    // in our update function we modify the the property of
    // the compoented which will cause the component to re-render
    update() {
      this.numberOfGuests = this.model.getNumberOfGuests();
      this.selectDishes = this.model.getSelectDishes();
      this.totalPrice = this.model.setTotalPrice();
    },

    // our handler for the input's on change event
    onDidChangeNumberOfGuests(e) {
      this.model.setNumberOfGuests(+e.target.value);
    },

    
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  background: #eee;
  overflow: hidden;
  width: 25%;
  float: left;
}

h2 {
  padding: 0 5%;
}

.peopleNum {
  padding: 0 5%;
}

input {
  width: 50px;
}

.table-responsive {
  margin-top: 12%;
  background: #ccc;
}

table {
  width: 100%;
}

th {
  width: 50%;
  text-align: left;
}

.text-right {
  text-align: right;
}

td {
  color: #660000;
}

.price {
  padding-right: 8px;
  color: #660000;
  font-weight: bold;
  text-align: right;
}

.routerlink, button {
  display: block;
  margin: 2em auto;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  border-radius: 6px;
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}

button {
  color: #fff;
  background-color: #ccc;
  border-color: #ccc;
}

</style>

