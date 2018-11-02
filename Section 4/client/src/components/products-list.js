import React, {Component} from 'react';
import {ProductsListItem} from './products-list-item';

export class ProductsList extends Component {
    render() {
        return (
            <div className="row">
                {this.props.products.map(product => {
                    return (
                        <div key={product._id} className="col-sm-4 px-1 my-5">
                            <ProductsListItem product={product} addToCart={this.props.addToCart}></ProductsListItem>
                        </div>
                    )
                })}
            </div>
        )
    }
}