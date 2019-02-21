<template>
  <div class="dishdetails">
    <sidebar :model="this.model"/>
    <em v-if="status === 'LOADING'">Loading...</em>
    <b v-else-if="status === 'ERROR'">Failed to load data, please try again</b>

    <div v-else class="row">
      <div id="dishInfo" class="col-md-6">
        <h2>{{dishDetail.title}}</h2>
        <img class="img-rounded" :src="dishDetail.image">
        <p class="p-info">{{dishDetail.instructions}}</p>
        <router-link to="/search">
          <button id="backToSerBtn">Back to Search</button>
        </router-link>
      </div>

      <div id="dishIngrendients" class="col-md-6">
        <h4>
          Ingredients For
          <span class="num">{{numberOfGuests}}</span> People
        </h4>

        <table class="table">
          <tbody></tbody>
          <tfoot>
            <tr v-for="ingredients in dishIngredients" :key="ingredients.id">
              <td>{{ingredients.amount*numberOfGuests}}&nbsp;{{ingredients.unit}}</td>
              <td>{{ingredients.name}}</td>
              <td>SEK</td>
              <!-- <td>{{1.00*numberOfGuests}}</td> -->
              <td>{{(1*numberOfGuests).toFixed(2)}}</td>
            </tr>
            <tr>
              <td>
                <button id="addToMenuBtn" @click="addToMenu">Add to Menu</button>
              </td>
              <td></td>
              <td>SEK</td>
              <td class="total-price">{{dishDetail.pricePerServing*numberOfGuests}}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import modelInstance from "../data/DinnerModel";
import Sidebar from "@/components/Sidebar";

export default {
  props: ["model"],

  components: {
    sidebar: Sidebar
  },

  created() {
    this.model.addObserver(this);
  },

  // this is called when component is removed destroyed
  // good place to remove observer
  beforeDestroy() {
    this.model.removeObserver(this);
  },

  mounted() {
    // when data is retrieved we update it's properties
    // this will cause the component to re-render
    modelInstance
      .getDish(this.$route.params.id)
      .then(detail => {
        this.status = "LOADED";
        console.log(detail);
        // 详情数据存到dishDetail里 参考lab3把html加上
        this.dishDetail = detail;
        this.dishIngredients = detail.extendedIngredients;
      })
      .catch(() => {
        this.status = "ERROR";
      });
  },

  methods: {
    // in our update function we modify the the property of
    // the compoented which will cause the component to re-render
    update() {
      this.numberOfGuests = this.model.getNumberOfGuests();
    },

    addToMenu() {
      this.model.pushSelectDish(this.dishDetail);
    }
  },

  data() {
    return {
      status: "LOADING",
      numberOfGuests: this.model.getNumberOfGuests(),
      dishDetail: null,
      dishIngredients: null
    };
  }
};
</script>

<style scoped>
.loading,
.row {
  overflow: hidden;
  width: 75%;
  float: left;
  position: relative;
  min-height: 1px;
}

.row .col-md-6 {
  display: block;
  width: 50%;
  float: left;
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
}

#dishInfo img {
  width: 100%;
}

#dishInfo .p-info {
  margin: 2em 0;
}

#backToSerBtn {
  margin-bottom: 2em;
}

#dishIngrendients {
  margin: 4em 0;
  background: #ffcc66;
  overflow: hidden;
}

#dishIngrendients .table {
  margin-bottom: 0;
  width: 100%;
  max-width: 100%;
  background-color: transparent;
  border-collapse: collapse;
  border-spacing: 0;
  box-sizing: border-box;
  display: table;
  border-color: grey;
}

#dishIngrendients tr {
  height: 40px;
  border-bottom: 2px solid #ccc;
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
