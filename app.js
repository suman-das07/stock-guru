let productsArray = JSON.parse(localStorage.getItem(`myProducts`)) || [];

function saveProducts() {
  localStorage.setItem("myProducts", JSON.stringify(productsArray));
}

let id = 0;
if (productsArray.length > 0) {
  id = productsArray[productsArray.length - 1].id;
}
