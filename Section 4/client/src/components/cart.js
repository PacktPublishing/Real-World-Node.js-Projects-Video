import React, {Component} from 'react';

export class Cart extends Component {
    render() {
        return (
            <div>
                {
                    this.props.products.map(product => {
                        return (
                            <div className="d-flex align-items-center my-5">
                                <img src={product.imageURL} alt="" className="product-img"></img>
                                <div className="d-flex flex-column justify-content-center align-items-center mr-2">
                                    <span>{product.name}</span>
                                    <span>{product.price}</span>
                                </div>
                                <button className="btn btn-danger" onClick={() => this.props.removeFromCart(product)}>Remove</button>
                            </div>
                        )
                    })
                }
                <div className="d-flex justify-content-center">
                    <button className="btn btn-success" disabled={this.props.products.length === 0} onClick={this.props.placeOrder}>Order</button>
                </div>
            </div>
        )
    }
}