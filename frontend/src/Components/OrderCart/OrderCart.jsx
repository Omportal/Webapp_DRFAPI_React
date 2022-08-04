import React from 'react';
import './OrderCart.css';

function OrderCart({ orderResult }) {
    const { title, quantity, price } = orderResult;
    return (
        <div className='order__item'>
            <div className='order-title'>
                <span>{title}</span>
                <div className='order-quantity'>
                    <span>{quantity}x</span>
                </div>
            </div>
            <div className='order-total'>
                <span>{price * quantity} руб.</span>
            </div>
        </div >

    )
}

export default OrderCart