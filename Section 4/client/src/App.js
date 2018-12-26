import React, { Component } from 'react';
import './App.css';
import {Navbar} from './components/navbar';
import { OrdersService } from './services/orders-service';
import { ProductsService } from './services/products-service';
import { ProductsList } from './components/products-list';
import { OrdersList } from './components/orders-list';
import { Cart } from './components/cart';


class App extends Component {
  constructor(props) {
    super(props);
    this.ordersService = new OrdersService();
    this.productsService = new ProductsService();
    this.state = {
      products: [],
      orders: [],
      cart: [],
      customer: {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@gmail.com",
        phone: "123456789",
        address: {
          street: "Foobar Street",
          number: 42
        }
      }
    }

    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
  }

  async componentDidMount() {
    await this.loadProducts();
    await this.loadOrders(this.state.customer.email);
  }

  async loadProducts() {
    let products = await this.productsService.findAll();
    this.setState({
      products: products
    });
  }

  async loadOrders(customerEmail) {
    let orders = await this.ordersService.findAll(customerEmail);
    this.setState({
      orders: orders
    })
  }

  addToCart(product) {
    this.setState({
      cart: [
        ...this.state.cart,
        product
      ]
    });
  }

  removeFromCart(product) {
    this.setState({
      cart: this.state.cart.filter(p => p!==product)
    });
  }

  async placeOrder() {
    await this.ordersService.create({
      products: this.state.cart,
      customer: this.state.customer
    });
    await this.loadOrders(this.state.customer.email);
    this.setState({
      cart: []
    });
  }

  render() {
    return (
      <div id="app">
        <Navbar></Navbar>
        <div className="container-fluid">
          <div className="row main-areas-wrapper">
            <div className="col-sm-3 main-area">
              <h4>Orders</h4>
              <OrdersList orders={this.state.orders}></OrdersList>
            </div>
            <div className="col-sm-6 main-area products-container">
              <h4>Products</h4>
              <ProductsList products={this.state.products} addToCart={this.addToCart}></ProductsList>
            </div>
            <div className="col-sm-3 main-area">
              <h4>Cart</h4>
              <Cart products={this.state.cart} placeOrder={this.placeOrder} removeFromCart={this.removeFromCart}></Cart>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
