class Item {
  constructor(food, calorie) {
    this.food = food;
    this.calorie = calorie;
  }
}

class UI {
  static displayItem() {
    const items = Store.getItems();

    items.forEach(item => UI.addItemToList(item));
  }

  static addItemToList(item) {
    const list = document.querySelector("#list");

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${item.food}</td>
            <td>${item.calorie}</td>
            <td class="delete-btn"><a href="#" class="delete-button">x</a></td>
        `;

    list.appendChild(row);

    UpdateTotalCalories();
  }

  static deleteItem(el) {
    if (el.classList.contains("delete-button")) {
      el.parentElement.parentElement.remove();
    }

    UpdateTotalCalories();
  }

  static clearFields() {
    document.querySelector("#input-item").value = "";
    document.querySelector("#input-calorie").value = "";
  }
}

class Store {
  static getItems() {
    let items;
    if (localStorage.getItem("items") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
  }

  static addItem(item) {
    const items = Store.getItems();

    items.push(item);

    localStorage.setItem("items", JSON.stringify(items));
  }

  static removeItem(calorie) {
    const items = Store.getItems();

    items.forEach((item, index) => {
      if (item.calorie === calorie) {
        items.splice(index, 1);
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
  }
}

document.addEventListener("DOMContentLoaded", UI.displayItem);

document.querySelector(".form").addEventListener("submit", e => {
  e.preventDefault();

  const food = document.querySelector("#input-item").value;
  const calorie = document.querySelector("#input-calorie").value;

  if (food === "" || calorie === "") {
    alert("asd");
  } else {
    const item = new Item(food, calorie);

    UI.addItemToList(item);

    Store.addItem(item);

    UI.clearFields();
  }
});

document.querySelector("#list").addEventListener("click", e => {
  UI.deleteItem(e.target);

  Store.removeItem(e.target.parentElement.previousElementSibling.textContent);
});

function UpdateTotalCalories() {
  const list = document.querySelector("#list");
  let sumVal = 0;

  for (let i = 0; i < list.rows.length; i++) {
    sumVal = sumVal + parseInt(list.rows[i].cells[1].innerHTML);
  }
  document.getElementById("total").innerHTML = "Total Calories: " + sumVal;
}
