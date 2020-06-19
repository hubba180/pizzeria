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
  $("#cart-pizzas").on("click", "button", function() {
    pizzaItem = parseInt($(this).attr("id"))
    delete vialeArcabeleno.pizzas[pizzaItem - 1]
    let newArray = [];
    vialeArcabeleno.pizzas.forEach(function(element) {
      if (element) {
        newArray.push(element)
      }
    });
    vialeArcabeleno.pizzas = newArray;
    $("#cart-pizzas").empty()
    $("#order-cost").text(`Your total cost: $${vialeArcabeleno.totalCost()}`);
    $("#total-pizzas").text(`Pizzas in cart: ${vialeArcabeleno.pizzas.length}`);
    vialeArcabeleno.pizzas.forEach(function(element) {
      $("#cart-pizzas").append(`<div id='pizza${index}'>1 ${element.size} pizza for ${element.name} <br> Crust: ${element.crust}<br> Sauce: ${element.sauce}<br> Cheese: ${element.cheese}<br> Toppings: ${element.toppingsArray}<br><button id='${vialeArcabeleno.pizzas.length}'>Remove Pizza</button></div>`)
    })
  })
}

function nextButton(id, showid, hideid, id2, showid2) {
  $("#" + id).click(function() {
    $("#" + showid).fadeIn();
    $("#" + hideid).hide();
  });
  $("#" + id2).click(function() {
    $("#" + showid2).fadeIn();
    $("#" + hideid).hide();
  });
}

$(document).ready(function() {
  let vialeArcabeleno = new Pizzeria()
  let index = 1;
  attachEventListeners(vialeArcabeleno, index);
  
  $("#name-button").click(function() {
    $("#name-div").hide();
    $("#size-div").fadeIn();
  });
  
  $("#toppings-button-2").click(function() {
    $("#cheese-div").fadeIn();
    $("#toppings-div").hide();
  });
  nextButton("size-button", "crust-div", "size-div", "size-button-2", "name-div");
  nextButton("crust-button", "sauce-div", "crust-div", "crust-button-2", "size-div");
  nextButton("sauce-button", "cheese-div", "sauce-div", "sauce-button-2", "crust-div");
  nextButton("cheese-button", "toppings-div", "cheese-div", "cheese-button-2", "sauce-div");

  $("#pizza-maker").submit(function() {
    event.preventDefault();
    const name = $("#name").val();
    const size = $("input:radio[name=size]:checked").val();
    const crust = $("#crust").val();
    const sauce = $("input:radio[name=sauce]:checked").val();
    const cheese = $("input:radio[name=cheese]:checked").val();
    let toppingsArray = [];
    const toppings = $("input:checkbox[name=toppings]:checked").each(function() {
      const eachTopping = $(this).val();
      toppingsArray.push(eachTopping);
    });
    let pizzaInput = new Pizza(name, size, crust, sauce, cheese, toppingsArray);
    vialeArcabeleno.pizzas.push(pizzaInput);
    $("#cart-pizzas").append(`<br><div id='pizza${index}'><strong>1 ${pizzaInput.size} pizza for ${pizzaInput.name}</strong><br>Crust: ${pizzaInput.crust}<br> Sauce: ${pizzaInput.sauce}<br>Cheese: ${pizzaInput.cheese}<br>Toppings: ${toppingsArray.map(function(pizza) {return " " + pizza;})}<br>Cost: $${pizzaInput.cost()}<br><button id='${vialeArcabeleno.pizzas.length}'>Remove Pizza</button></div>`)
    $("#order-cost").text(`Your total cost: $${vialeArcabeleno.totalCost()}`);
    $("#total-pizzas").text(`Pizzas in cart: ${vialeArcabeleno.pizzas.length}`);
    index++
    $("#toppings-div").hide();
    $("#name-div").fadeIn();
  });
});
