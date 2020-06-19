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

$(document).ready(function() {
  let vialeArcabeleno = new Pizzeria()
  let index = 0

  $("#pizza-maker").submit(function() {
    event.preventDefault();
    const name = $("#name").val();
    const size = $("input:radio[name=size]:checked").val();
    const crust = $("#crust").val();
    const sauce = $("input:radio[name=sauce]:checked").val();
    const cheese = $("input:radio[name=cheese]:checked").val();
    const toppings = $("input:checkbox[name=toppings]:checked").each(function() {
      const eachTopping = $(this).val()
    });
    let pizzaInput = new Pizza(name, size, crust, sauce, cheese, toppings);
    $("#pizza-cost").text("Total cost: " + pizzaInput.cost())
    vialeArcabeleno.pizzas.push(pizzaInput);
    index++
    $("#cart").append(`1 ${pizzaInput.size} pizza for ${pizzaInput.name} <br> Crust: ${pizzaInput.crust}<br> Sauce: ${pizzaInput.sauce}<br> Cheese: ${pizzaInput.cheese}<br> Toppings: ${pizzaInput.toppings}<br>`)
    $("#order-cost").text(`Your total cost: $${vialeArcabeleno.totalCost()}`);
    $("#total-pizzas").text(`Pizzas in cart: ${vialeArcabeleno.pizzas.length}`);
    console.log(vialeArcabeleno.pizzas)
  });
});
