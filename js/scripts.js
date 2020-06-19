// Business Logic for Pizza Object

function Pizza(name, size, crust, sauce, cheese, toppings) {
  this.name = name
  this.size = size
  this.crust = crust
  this.sauce = sauce
  this.cheese = cheese
  this.toppings = toppings;
}

// UI logic

$(document).ready(function() {
  let name;
  let size;
  let crust;
  let sauce;
  let cheese;
  let toppingsArray = [];

  $("#pizza-maker").submit(function() {
    event.preventDefault();
    name = $("#name").val();
    size = $("input:radio[name=size]:checked").val();
    crust = $("#crust").val();
    sauce = $("input:radio[name=sauce]:checked").val();
    cheese = $("input:radio[name=cheese]:checked").val();
    toppings = $("input:checkbox[name=toppings]:checked").each(function() {
      const eachTopping = $(this).val()
      toppingsArray.push(eachTopping);
    });
  });

  let pizza = new Pizza(name, size, crust, sauce, cheese, toppingsArray)
});