let productsArray = JSON.parse(localStorage.getItem(`myProducts`)) || [];

function saveProducts() {
  localStorage.setItem("myProducts", JSON.stringify(productsArray));
}

