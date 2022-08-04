import React, { useState } from 'react';
import "./Card.css";
import Button from '../Button/Button';

function Card({ food, onAdd, onRemove }) {
    const [count, setCount] = useState(0);

    const { title, image, price, description } = food;
    const handleIncrement = () => {
        setCount(count + 1);
        onAdd(food);
    }
    const handleDecrement = () => {
        setCount(count - 1);
        onRemove(food);
    }

    const showCont = (e) => {
        var el = e.currentTarget.getElementsByClassName('description')
        el[0].classList.contains('hide-class') ? el[0].classList.remove('hide-class') : el[0].className += ' hide-class';


    }
    return (
        < div className='card'>
            <span className={`${count !== 0 ? "card__badge" : "card__badge--hidden"}`}>
                {count}
            </span>
            <div className="image__container">
                <img className='img-width' src={image} alt={title} />
            </div>
            <h3 className="card__title" >
                {title}
            </h3>
            <div className="card__price">
                {price} руб.
            </div>
            <div className="btn-container">
                <Button title={'+'} type={'add'} onClick={handleIncrement} />
                {count !== 0 ? (
                    <Button title={'-'} type={'remove'} onClick={handleDecrement} />
                ) : (
                    ""
                )}
            </div>
            <div className="cont" onClick={showCont}>
                <Button title={'INFO'} type={'info'} />
                <div className='description hide-class'>
                    <h4>{description}</h4>
                </div>
            </div>
        </div>
    );
}

export default Card