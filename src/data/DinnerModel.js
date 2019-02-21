import ObservableModel from "./ObservableModel";
import API from "./API";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/66";
const httpOptions = {
  headers: {
    "X-Mashape-Key": API.API_KEY
  }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = this.getCookie('numberOfGuests') ? this.getCookie('numberOfGuests') : 1;
    this._selectDishes = JSON.parse(this.getCookie('selectDishes')) ? JSON.parse(this.getCookie('selectDishes')) : [];
    this.getNumberOfGuests();
  }

  getCookie(c_name) {
    var cookieValue = null;
    if (window.localStorage) {
      cookieValue = window.localStorage.getItem(c_name)
    }
    return cookieValue;
  }

  setCookie(name,value) {
    if (window.localStorage) {
      window.localStorage.setItem(name,value)
    }
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.setCookie('numberOfGuests',num);
    this.notifyObservers();
  }

  /**
   * push select dish
   * @param {object} dish
   */
  pushSelectDish(dish) {
    var selectedDishes = this._selectDishes;
    for (var i = 0; i < selectedDishes.length; i++) {
      if (selectedDishes[i].id == dish.id) {
        this._selectDishes.splice(i, 1);
        break;
      }
    }
    this._selectDishes.push(dish);
    console.log(JSON.stringify(this._selectDishes));
    this.setCookie('selectDishes',JSON.stringify(this._selectDishes));
    this.notifyObservers();
  }

  getSelectDishes() {
    return this._selectDishes;
  }

  setTotalPrice() {
    var totalPrice = 0;
    for (var i = 0; i < this._selectDishes.length; i++) {
      totalPrice +=
        this._selectDishes[i].pricePerServing * this._numberOfGuests;
    }
    return totalPrice;
  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes(type, filter) {
    const url = `${BASE_URL}/recipes/search?number=20&type=${type}&query=${filter}`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  getDish(id) {
    const url = `${BASE_URL}/recipes/${id}/information`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }
}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
