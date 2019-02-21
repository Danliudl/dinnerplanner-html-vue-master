import Vue from "vue";
import Router from "vue-router";
import Welcome from "@/components/Welcome";
import SelectDish from "@/components/SelectDish";
import DishDetails from "@/components/DishDetails";
import DinnerInfo from "@/components/DinnerInfo";
import PrintRecipe from "@/components/PrintRecipe";
import modelInstance from "@/data/DinnerModel";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Welcome",
      component: Welcome
    },
    {
      path: "/search",
      name: "SelectDish",
      component: SelectDish,
      props: { model: modelInstance }
    },
    {
      path: "/dishdetails/:id", //传递详情id参数
      name: "DishDetails",
      component: DishDetails,
      props: { model: modelInstance } // 绑定数据模型，不加报错
    },
    {
      path: "/dinnerInfo", 
      name: "DinnerInfo",
      component: DinnerInfo,
      props: { model: modelInstance }
    },
    {
      path: "/printRecipe", 
      name: "PrintRecipe",
      component: PrintRecipe,
      props: { model: modelInstance } 
    }
  ]
});
