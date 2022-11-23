import { Fragment, useState } from 'react';
import ExploreIcon from '../../assets/svg/ExploreIcon'; 
import HomeIcon from '../../assets/svg/HomeIcon';
import ProfileIcon from '../../assets/svg/ProfileIcon';
import classes from './NavList.module.css'
import NavItem from './NavItem';
import { useSelector } from 'react-redux';
import React from 'react';

const itemLoggedInList = [
    {
        id: 0,
        text: "Home",
        icon: <HomeIcon />
    },
    {
        id: 1,
        text: "Explore",
        icon: <ExploreIcon />
    },
    {
        id: 2,
        text: "Profile",
        icon: <ProfileIcon />
    }
];

const itemLoggedOutList = [
    {
        id: 0,
        text: "Explore",
        icon: <ExploreIcon />
    }
]

const NavList = (props) => {

    //Here we maintian a state for showing list item if user is logged in or Out 

    const logStatus = useSelector((state) => state.auth.loggedIn)
    // const [ list, setList ] = useState(itemLoggedOutList);

    //redux se jaise hi state change hogi "loggedIn" waali then we also have to change 
    let navListFinal = [];
    if(logStatus) {
        navListFinal = navListFinal.concat(itemLoggedInList);
    }    
    else{
        navListFinal = navListFinal.concat(itemLoggedOutList);
    }
    
    // console.log(navListFinal);

    return (
        <Fragment>
            <nav className={classes['leftNavList--items']}>
                {navListFinal.map((ele) => (
                    <NavItem
                        key={ele.id}
                        id={ele.id}
                        icon={ele.icon}
                        text={ele.text}
                    />
                ))}
            </nav>
        </Fragment>
    )
}

export default NavList;