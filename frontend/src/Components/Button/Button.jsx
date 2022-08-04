import React from 'react';
import './Button.css';

function Button({ type, title, disable, onClick, value }) {
    return (
        <button
            className={`btn ${(type === 'add' && 'add') ||
                (type === 'remove' && 'remove') ||
                (type === 'checkout' && 'checkout') ||
                (type === 'info' && 'info')
                } `}
            disabled={disable}
            onClick={onClick}
            value={value}
        >

            {title}
        </button>
    );
}

export default Button