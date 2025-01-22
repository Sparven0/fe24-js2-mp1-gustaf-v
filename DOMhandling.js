import { productInstances } from "./productHandling.js";
const wrapper = document.querySelector(".wrapper");
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const priceToInput = document.querySelector('#sortByPrice')
const topRated = document.querySelector('#topRated')

function displayProductTitles(products) {
  wrapper.innerHTML = "";
  products.forEach((product) => {
    const prodContainer = document.createElement("div");
    prodContainer.classList.add("productContainer");
    wrapper.append(prodContainer);

    const prodContainerOverlay = document.createElement("div");
    prodContainerOverlay.classList.add("overlay");
    prodContainer.append(prodContainerOverlay);

    const imgEl = document.createElement("img");
    imgEl.src = product.images;
    prodContainer.append(imgEl);

    const titleEl = document.createElement("h1");
    titleEl.innerText = product.title;
    prodContainerOverlay.append(titleEl);

    const categoryEl = document.createElement("p");
    categoryEl.innerText = `Category: ${product.category}`;
    prodContainerOverlay.append(categoryEl);

    const priceEl = document.createElement("p");
    priceEl.innerText = product.price;
    prodContainerOverlay.append(priceEl);

    const stockEl = document.createElement('p');
    stockEl.innerText = `In stock: ${product.stock}`;
    prodContainerOverlay.append(stockEl);

    const cart = document.createElement('button');
    cart.innerText = 'Add to cart';
    prodContainerOverlay.append(cart)

    cart.addEventListener('click', () => {
      if (product.stock > 0) {
        product.stock -= 1;  
        stockEl.innerText = `In stock: ${product.stock}`;  
      } else {
        alert(`Sorry, ${product.title} is out of stock`);
      }
    });
  });
}


displayProductTitles(productInstances);

function filterByCat(category) {
  return productInstances.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    wrapper.innerHTML = "";

    const checkedCategory = Array.from(checkboxes).find(
      (checkbox) => checkbox.checked
    );
    if (checkedCategory) {
      const category = checkedCategory.id;
      const filteredProducts = filterByCat(category);
      displayProductTitles(filteredProducts);
    } else {
      displayProductTitles(productInstances);
    }
  });
});


function showCategoriesUnder(products, maxPrice){
    return products.filter(product => product.price <= maxPrice);
}

priceToInput.addEventListener('input', () => {
    wrapper.innerHTML = ''

    const maxPrice  = parseFloat(priceToInput.value);
    if(!isNaN (maxPrice)){
const filteredProducts = showCategoriesUnder(productInstances, maxPrice);
displayProductTitles(filteredProducts)
    }else displayProductTitles(productInstances)
})