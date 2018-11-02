import React, {Component} from 'react';

export class ProductsListItem extends Component {
    render() {
        return (
            <div className="d-flex justify-column-center align-items-center flex-column">
                <h5>{this.props.product.name}</h5>
                <img src={this.props.product.imageURL} alt="" className="product-img"></img>
                <strong className="price">{this.props.product.price}</strong>
                <button className="btn btn-success" onClick={() => this.props.addToCart(this.props.product)}>Add to Cart</button>
            </div>
        )
    }
}