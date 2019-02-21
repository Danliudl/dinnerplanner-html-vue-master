<template>
  <div class="topbar">
    <h2 class="numOfPeople">
      My Dinner:
      <span class="num">{{numberOfGuests}}</span> People
    </h2>

    <router-link to="/search" tag="button" class="backToEditBtn">Go Back To Edit Dinner</router-link>
  </div>
</template>

<script>
export default {
  props: ["model"],

  data() {
    return {
      numberOfGuests: this.model.getNumberOfGuests()
    };
  }
};
</script>

<style scoped>
.topbar {
  padding-bottom: 70px;
  margin-bottom: 5%;
  border-bottom: 2px solid;
  padding-left: 5%;
  padding-right: 5%;
}

.numOfPeople {
  float: left;
}

.backToEditBtn {
  float: right;
  margin-top: 20px;
  padding: 5px 16px;
  font-size: 13px;
  line-height: 1.33;
  border-radius: 6px;
  color: #fff;
  background-color: #f0ad4e;
  border-color: #eea236;
}
</style>

