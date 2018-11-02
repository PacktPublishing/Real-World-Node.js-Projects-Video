import React, {Component} from 'react';
import {OrdersListItem} from './orders-list-item';

export class OrdersList extends Component{
    render() {
        return (
            <div>
                {this.props.orders.map(order => {
                    return (
                        <div key={order._id}>
                            <OrdersListItem order={order}></OrdersListItem>
                        </div>
                    )
                })}
            </div>
        )
    }
}