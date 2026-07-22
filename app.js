let productsArray = JSON.parse(localStorage.getItem(`myProducts`)) || [];

function saveProducts() {
  localStorage.setItem("myProducts", JSON.stringify(productsArray));
}

let id = 0;
if (productsArray.length > 0) {
  id = productsArray[productsArray.length - 1].id;
}

let pName = document.querySelector("#productName");
let pCategory = document.querySelector("#category");
let pPrice = document.querySelector("#price");
let pQuantity = document.querySelector("#quantity");

let form = document.getElementById("productForm");
let submitBtn = document.querySelector("#submit");
let resetBtn = document.querySelector("#resetBtn");

let totalProdVal = document.querySelector("#total-product-value");
let lowStockVal = document.querySelector("#low-stock-value");
let outStockVal = document.querySelector("#out-of-stock-value");
let totalVal = document.querySelector("#total-value")


if (submitBtn) {
  submitBtn.addEventListener("click", function (process) {
    process.preventDefault();

    let productName = pName.value;
    let productCategory = pCategory.value;
    let productPrice = Number(pPrice.value);
    let productQuantity = Number(pQuantity.value);

    if (!validateForm(productName, productCategory, productPrice, productQuantity)) {
      return;
    }
    const productObject = {
      id: ++id,
      item: productName,
      category: productCategory,
      price: productPrice,
      quantity: productQuantity,
    }

    productsArray.push(productObject);

    saveProducts();

    form.reset();
  });
}

function validateForm(productName, productCategory, productPrice, productQuantity) {
  if (!productName || !productCategory || !productPrice || !productQuantity) {
    alert("Please Fill All Details");
    return false;
  }
  else {
    alert("Products Added");
    return true;
  }

}
function updateDashboardCards() {
  let productsArray = JSON.parse(localStorage.getItem(`myProducts`)) || [];

  totalProdVal.textContent = `${productsArray.length}`;
  let lowStock = 0;
  let outOfStock = 0;

  for (let val of productsArray) {
    if (val.quantity < 10) {
      lowStock++;
    }
    if (val.quantity === 0) {
      outOfStock++;
    }
  }
  let totalInventoryValue = productsArray.reduce((sum, allItems) => {
    return sum + (allItems.price * allItems.quantity);
  }, 0);

  lowStockVal.textContent = `${lowStock}`;
  outStockVal.textContent = `${outOfStock}`;
  totalVal.textContent = new Intl.NumberFormat("en", { notation: "compact" }).format(totalInventoryValue);

}
if (totalProdVal) {
  updateDashboardCards();
}
document.addEventListener("DOMContentLoaded", updateDashboardCards());

function getStatusBadge(quantity) {
  const qty = Number(quantity);
  if (qty === 0) {
    return `<span class="status out-of-stock">Out of Stock</span>`;
  } else if (qty < 10) {
    return `<span class="status low-stock">Low Stock</span>`;
  } else {
    return `<span class="status in-stock">In Stock</span>`;
  }
}

const fullTable = document.getElementById("productTableBody");

function renderTable(data) {
  let productsArray = data || JSON.parse(localStorage.getItem(`myProducts`)) || [];

  if (!fullTable) return;

  fullTable.innerHTML = "";

  if (productsArray.length === 0) {
    fullTable.innerHTML = `<tr><td colspan="7" style="text-align: center;">No products found</td></tr>`;
    return;
  }

  const tableData = productsArray.map((products, index) => {
    return ` <tr>
              <td>${index + 1}</td>
              <td>${products.item}</td>
              <td>${products.category}</td>
              <td>${Number(products.price).toLocaleString("en-IN")}</td>
              <td>${Number(products.quantity).toLocaleString("en-IN")}</td>
              <td>${getStatusBadge(products.quantity)}</td>
              <td>
              <button class="delete-btn" onclick="deleteProduct(${index})"><i class="ri-delete-bin-6-fill"></i></button>
              </td>
              </tr>`;
  }).join("");
  fullTable.innerHTML = tableData;
}
document.addEventListener("DOMContentLoaded", renderTable());

function deleteProduct(index) {
  let productsArray = JSON.parse(localStorage.getItem(`myProducts`)) || [];

  productsArray.splice(index, 1);

  localStorage.setItem("myProducts", JSON.stringify(productsArray));

  renderTable();
  updateDashboardCards();
}

if (fullTable) {
  renderTable();
  updateDashboardCards();
}

const searchTag = document.getElementById("searchBar");

searchTag.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchItem();
  }
})

function searchItem() {
  let productsArray = JSON.parse(localStorage.getItem(`myProducts`)) || [];

  let searchedVal = searchTag.value;

  let searchedItem = productsArray.filter(item => item.item.toLowerCase().includes(searchedVal));

  renderTable(searchedItem);

}

function filterCategory() {
  let productsArray = JSON.parse(localStorage.getItem(`myProducts`)) || [];

  let categoryVal = document.getElementById("categories");

  let categorySelected = categoryVal.value;

  if (categorySelected === "All") {
    renderTable();
    return;
  }

  let categoryItem = productsArray.filter(product => product.category.includes(categorySelected));

  renderTable(categoryItem);
}

function sortProducts() {
  let productsArray = JSON.parse(localStorage.getItem(`myProducts`)) || [];

  const sortVal = document.querySelector("#sort");

  let copyArrayItems = [...productsArray];

  switch (sortVal.value) {
    case "Name (A–Z)":
      copyArrayItems.sort((low, high) =>
        low.item.localeCompare(high.item));
      break;
    case "Name (Z–A)":
      copyArrayItems.sort((low, high) =>
        high.item.localeCompare(low.item));
      break;
    case "Price (Low → High)":
      copyArrayItems.sort((low, high) =>
        low.price - high.price);
      break;
    case "Price (High → Low)":
      copyArrayItems.sort((low, high) =>
        high.price - low.price);
      break;
    case "Quantity (Low → High)":
      copyArrayItems.sort((low, high) =>
        low.quantity - high.quantity);
      break;
    case "Quantity (High → Low)":
      copyArrayItems.sort((low, high) =>
        high.quantity - low.quantity);
      break;
    case "Newest First":
      copyArrayItems.sort((low, high) =>
        high.id - low.id);
      break;
    case "Oldest First":
      copyArrayItems.sort((low, high) =>
        low.id - high.id);
      break;

    default:
      // renderTable(productsArray)
      break;
  }
  renderTable(copyArrayItems)
}
