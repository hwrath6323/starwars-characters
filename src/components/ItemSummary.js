import React from 'react';
import Button from './Button';
import './ItemSummary.css';



const ItemSummary = (props) => {
    const {name, title, affiliation, homePlanet, removeItem, clickItem} = props;
    
    return (
        <li className='item-summary' onClick={clickItem}>
            <h3>{ name }</h3>
                {title} | {affiliation} | {homePlanet}
            <br />
            <Button onClick={removeItem}>Remove</Button>
        </li>
    )

};




 export default ItemSummary