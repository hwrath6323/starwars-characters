import React from 'react';

import './Button.css';

const Button = (props) => {
    const { children, className, ...rest} = props;
        return (
            <button {...rest} className={`sw-button ${className || ''}`}>
                {children}
            </button>
        )
    };

export default Button