<template>
  <div class="select-dish">
    <!-- We pass the model as property to the Sidebar component -->
    <sidebar :model="this.model"/>
    <div class="searchWrap clearfix">
      <h2>FIND A DISH</h2>
      <div class="row clearfix">
        <div class="col-md-4">
          <input
            type="text"
            v-model="inputType"
            id="inputKey"
            class="form-control"
            placeholder="Enter key words"
            @keyup.enter="searchMenu"
          >
        </div>
        <div class="col-md-4">
          <select class="form-control" id="selectType" v-model="selectedType" @change="searchMenu">
            <option value=''>All</option>
            <option>main course</option>
            <option>side dish</option>
            <option>dessert</option>
            <option>appetizer</option>
            <option>salad</option>
            <option>bread</option>
            <option>breakfast</option>
            <option>soup</option>
            <option>beverage</option>
            <option>sauce</option>
            <option>drink</option>
          </select>
        </div>
        <div class="col-md-4">
          <button type="button" id="searchBtn" @click="searchMenu">Search</button>
        </div>
      </div>

      <dishes :status="status" :dishes="dishes" :baseUri="baseUri"/>
    </div>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar";
import Dishes from "@/components/Dishes";
import modelInstance from "../data/DinnerModel";
export default {
  props: ["model"],

  components: {
    sidebar: Sidebar,
    dishes: Dishes
  },

  methods: {
    searchMenu() {
      modelInstance
      // .getAllDishes(type,filter)   放到父级里了 方便传参
      .getAllDishes(this.inputType, this.selectedType)
      .then(dishes => {
        this.status = "LOADED";
        this.baseUri = dishes.baseUri;
        this.dishes = dishes.results;
      })
      .catch(() => {
        this.status = "ERROR";
      });
    }
  },

  data() {
    return {
      status: "LOADING",
      numberOfGuests: this.model.getNumberOfGuests(),
      dishDetail: null,
      inputType: "",
      selectedType: "",
      dishes: [],
      baseUri: ""

    };
  },

  // this methods is called by Vue lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  mounted() {
    // when data is retrieved we update it's properties
    // this will cause the component to re-render
    this.searchMenu();
  },

};
</script>

<style scoped>
.searchWrap {
  overflow: hidden;
  width: 75%;
  float: left;
  position: relative;
  min-height: 1px;
}

.searchWrap h2 {
  padding: 0 15px;
}

.row {
  display: block;
  margin: 0;
  border-bottom: 2px solid #333;
}

.searchWrap .col-md-4 {
  margin-bottom: 5%;
  width: 25%;
  float: left;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
}

input,
select {
  display: block;
  width: 100%;
  height: 34px;
  font-size: 14px;
  line-height: 1.42857;
  color: rgb(85, 85, 85);
  background-color: rgb(255, 255, 255);
  background-image: none;
  box-shadow: rgba(0, 0, 0, 0.075) 0px 1px 1px inset;
  padding: 6px 12px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(204, 204, 204);
  border-image: initial;
  border-radius: 4px;
  transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
  box-sizing: border-box;
}

button {
  padding: 5px 16px;
  font-size: 13px;
  line-height: 1.33;
  border-radius: 6px;
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
</style>
