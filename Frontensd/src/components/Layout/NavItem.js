import {
    NavLink
  } from "react-router-dom";
import classes  from './NavItem.module.css'

const NavItem = (props) => {

    return (
            <NavLink to="/" activeclassname={classes.active}>
                <div className={classes["iconDiv"]}>{props.icon}</div>
                <div>{props.text}</div>
            </NavLink>
    )

}

export default NavItem;