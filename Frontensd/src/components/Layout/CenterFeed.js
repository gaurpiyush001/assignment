import { useSelector } from "react-redux";
import TweetInputBlock from "../Tweet/TweetInputBlock";
import { Routes, Route, Navigate } from "react-router-dom";
import UserProfile from "./../../pages/UserProfile";
import Home from "./../../pages/Home"
import NotFound from "./../../pages/NotFound";
import Explore from "./../../pages/Explore";
// import classes from "./RightNavigation.module.css"
import { Fragment } from "react";

//this will be an layout component

const CenterFeed = () => {

    // return (

    // {/* Yaha mujhe search bar aur TweetInput Block mein se koi ek render krana hai according to Login state */}

    // )
    const loggIn = useSelector(state => state.auth.loggedIn)
    // console.log("incenter", loggIn)
    return (
        <Fragment>
            <Routes>
                <Route path='/' element={<Navigate replace to={loggIn ? 'home' : 'explore'} />} />
                <Route path="home" element={<Home />} />
                <Route path='explore' element={<Explore />} />
                <Route path='profile' element={<Explore />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Fragment>
        // <Explore />
    )
}

export default CenterFeed;