// Business Logic for Pizzeria Object
function Pizzeria() {
  this.pizzas = []
}

Pizzeria.prototype.totalCost = function() {
  let finalCost = 0;
  this.pizzas.forEach(function(pizza) {
    finalCost += pizza.cost();
  })
  return finalCost
}


// Business Logic for Pizza Object

function Pizza(name, size, crust, sauce, cheese, toppings) {
  this.name = name
  this.size = size
  this.crust = crust
  this.sauce = sauce
  this.cheese = cheese
  this.toppings = toppings;
}

Pizza.prototype.cost = function() {
  let cost = 0;
  if (this.size === "Personal" || this.size === "Medium") {
    cost += 3
  } else if (this.size === "Large") {
    cost += 5
  } else if (this.size === "Party Size") {
    cost += 6
  }
  if (this.crust === ("Thin Crust" || "Cauliflower")) {
    cost += 2
  } else if (this.crust === ("Deep Crust" || "Thick Crust" || "Cheese-filled")) {
    cost += 3
  }
  if (this.sauce === "Marinara") {
    cost += 1
  } else {
    cost += 2
  }
  if (this.cheese === ("Ricotta" || "Swiss")) {
    cost += 2
  } else {
    cost += 1
  }
  cost += this.toppings.length;
  return cost;
}

// UI logic

function attachEventListeners(vialeArcabeleno, index) {
  $("#cart").on("click", "button", function() {
    pizzaItem = parseInt($(this).attr("id"))
    delete vialeArcabeleno.pizzas[pizzaItem - 1]
    let newArray = [];
    vialeArcabeleno.pizzas.forEach(function(element) {
      if (element) {
        newArray.push(element)
      }
    });
    vialeArcabeleno.pizzas = newArray;
    $("#cart").empty()
    vialeArcabeleno.pizzas.forEach(function(element) {
      $("#cart").append(`<div id='pizza${index}'>1 ${element.size} pizza for ${element.name} <br> Crust: ${element.crust}<br> Sauce: ${element.sauce}<br> Cheese: ${element.cheese}<br> Toppings: ${element.toppingsArray}<br><button id='${vialeArcabeleno.pizzas.length}'>Remove Pizza</button></div>`)
    })
  })
}

$(document).ready(function() {
  let vialeArcabeleno = new Pizzeria()
  let index = 1;
  attachEventListeners(vialeArcabeleno, index);
  $("#pizza-maker").submit(function() {
    event.preventDefault();
    const name = $("#name").val();
    const size = $("input:radio[name=size]:checked").val();
    const crust = $("#crust").val();
    const sauce = $("input:radio[name=sauce]:checked").val();
    const cheese = $("input:radio[name=cheese]:checked").val();
    let toppingsArray = [];
    const toppings = $("input:checkbox[name=toppings]:checked").each(function() {
      const eachTopping = $(this).val()
      toppingsArray.push(eachTopping);
    });
    let pizzaInput = new Pizza(name, size, crust, sauce, cheese, toppingsArray);
    vialeArcabeleno.pizzas.push(pizzaInput);
    $("#cart").append(`<br><div id='pizza${index}'><strong>1</strong> ${pizzaInput.size} pizza for ${pizzaInput.name} <br> Crust: ${pizzaInput.crust}<br> Sauce: ${pizzaInput.sauce}<br> Cheese: ${pizzaInput.cheese}<br> Toppings: ${pizzaInput.toppingsArray}<br>Cost: $${pizzaInput.cost()}<br><button id='${vialeArcabeleno.pizzas.length}'>Remove Pizza</button></div>`)
    $("#order-cost").text(`Your total cost: $${vialeArcabeleno.totalCost()}`);
    $("#total-pizzas").text(`Pizzas in cart: ${vialeArcabeleno.pizzas.length}`);
    console.log(vialeArcabeleno.pizzas)
    index++
  });
});
