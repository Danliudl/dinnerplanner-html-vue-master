<template>
  <div id="app">
    <h1>Dinner Planner</h1>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
h1 {
  margin: 0;
  padding: 1em 0;
  background: #ccc;
  text-align: center;
}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
</style>
