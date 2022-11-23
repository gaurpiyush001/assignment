import { Link } from "react-router-dom";
import { redirect } from "react-router-dom";
import classes from './Cart.module.css';
import React from "react";

const Cart = (props) => {

    // const onClickHandler = () => {
    //     <redirect to={props.userId} />
    // }

    return (
        <div className={classes.cart}>
            {props.children}
        </div>
    )
}

export default Cart;