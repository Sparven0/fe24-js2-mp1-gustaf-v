import { getData } from "./fetches.js";

class Product {
  constructor({
    title,
    images,
    stock,
    price,
    discountPercentage,
    category,
    rating,
  }) {
    this.title = title;
    this.images = images[0];
    this.stock = stock;
    this.price = price;
    this.discountPercentage = discountPercentage;
    this.category = category;
    this.rating = rating;
  }
  getDiscountedPrice() {
    const newPrice = this.price * (1 - this.discountPercentage / 100);
    return newPrice;
  };
  updateStock(change){
    const newStock = this.stock - change
    return newStock
  }
}

const data = await getData();

export const productInstances = data.products.map(productData => new Product(productData));
  
