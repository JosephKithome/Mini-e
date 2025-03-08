import { Component } from '@angular/core';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.css'],
})
export class EcommerceComponent {
  searchQuery: string = '';
  priceRange: number = 5000;
  selectedCategory: string | null = null;
  cart: { id: number; name: string; price: number; category: string; image: string; quantity: number }[] = [];

  categories: string[] = ['Electronics', 'Clothing', 'Groceries', 'Home & Kitchen'];
  
   products = [
    { id: 1, name: 'Smartphone', price: 300, category: 'Electronics', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9', quantity: 0 },
    { id: 2, name: 'Laptop', price: 800, category: 'Electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8', quantity: 0 },
    { id: 3, name: 'T-Shirt', price: 20, category: 'Clothing', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2', quantity: 0 },
    { id: 4, name: 'Jeans', price: 50, category: 'Clothing', image: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15', quantity: 0 },
    { id: 5, name: 'Bread', price: 5, category: 'Groceries', image: 'https://images.unsplash.com/photo-1601050690597-c6c063e27708', quantity: 0 },
    { id: 6, name: 'Milk', price: 3, category: 'Groceries', image: 'https://images.unsplash.com/photo-1587049352822-bae6ea3ff405', quantity: 0 },
    { id: 7, name: 'Blender', price: 100, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1631060880953-53ef57575a16', quantity: 0 },
    { id: 8, name: 'Microwave', price: 150, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1607522370275-330c13959f28', quantity: 0 },
    { id: 9, name: 'Headphones', price: 120, category: 'Electronics', image: 'https://images.unsplash.com/photo-1516361728385-491302250b8e', quantity: 0 },
    { id: 10, name: 'Gaming Mouse', price: 45, category: 'Electronics', image: 'https://images.unsplash.com/photo-1590658268034-624c54cfb354', quantity: 0 },
    { id: 11, name: 'Running Shoes', price: 80, category: 'Clothing', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77', quantity: 0 },
    { id: 12, name: 'Backpack', price: 60, category: 'Accessories', image: 'https://images.unsplash.com/photo-1596755095320-435d5cc33542', quantity: 0 },
    { id: 13, name: 'Coffee Maker', price: 70, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836', quantity: 0 },
    { id: 14, name: 'Watch', price: 200, category: 'Accessories', image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3', quantity: 0 },
    { id: 15, name: 'Water Bottle', price: 15, category: 'Sports & Outdoors', image: 'https://images.unsplash.com/photo-1578848354743-08e59e84c9b0', quantity: 0 },
    { id: 16, name: 'Cereal', price: 7, category: 'Groceries', image: 'https://images.unsplash.com/photo-1610484826967-ade305eb3c97', quantity: 0 },
    { id: 17, name: 'Sofa', price: 500, category: 'Furniture', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511', quantity: 0 },
    { id: 18, name: 'Desk Lamp', price: 30, category: 'Home & Office', image: 'https://images.unsplash.com/photo-1599427303058-f04cbcf4756b', quantity: 0 },
    { id: 19, name: 'Sunglasses', price: 90, category: 'Accessories', image: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2', quantity: 0 },
    { id: 20, name: 'Electric Kettle', price: 40, category: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1607001212437-4093b94de6c1', quantity: 0 },
  ];
  
  
  

  
  get filteredProducts() {
    return this.products.filter(product => {
      return (
        (!this.searchQuery || product.name.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
        (!this.selectedCategory || product.category === this.selectedCategory) &&
        product.price <= this.priceRange
      );
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = this.selectedCategory === category ? null : category;
  }

  updateCart(product: any, quantity: number) {
    if (quantity < 0) return; // Prevent negative values

    product.quantity = quantity;

    const cartItem = this.cart.find(item => item.id === product.id);
    if (cartItem) {
      if (quantity === 0) {
        this.cart = this.cart.filter(item => item.id !== product.id);
      } else {
        cartItem.quantity = quantity;
      }
    } else if (quantity > 0) {
      this.cart.push({ ...product });
    }
  }

  increaseQuantity(product: any) {
    this.updateCart(product, product.quantity + 1);
  }

  decreaseQuantity(product: any) {
    this.updateCart(product, product.quantity - 1);
  }

  getCartTotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
