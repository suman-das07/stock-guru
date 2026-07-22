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
