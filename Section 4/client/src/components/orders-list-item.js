import React, {Component} from 'react';

export class OrdersListItem extends Component {
    render() {
        return (
            <div className="mb-5 order-list-item">
                {
                    this.props.order.products.map(product => {
                        return (
                            <div>{product.name} - {product.price}</div>
                        )
                    })
                }
                <br/>
                <strong>Total Price: </strong>
                {
                    this.props.order.products.reduce( (acc, product) => {
                        return acc + product.price
                    }, 0 )
                }
                <hr/>
            </div>
        )
    }
}