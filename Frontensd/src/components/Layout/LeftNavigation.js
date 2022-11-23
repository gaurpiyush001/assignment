import logo from '../../assets/twitter.png';
import classes from "./LeftNavigation.module.css"
import UserCart from '../Users/UserCart';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './../Users/Cart';
// import UserLogOut from '../Users/UserCartLogOut';
import NavList from './NavList';
import { Fragment, useState } from 'react';
import UserCartButton from '../Users/UserCartButton';
import LogInModal from '../UI/Search/Modal/LogInModal';
import SignUpModal from '../UI/Search/Modal/SignUpModal';
import { useNavigate } from 'react-router-dom';
import { authLogOut } from '../../store/actions/user-actions';


const LeftNavigation = () => {

    const logStatus = useSelector((state) => state.auth.loggedIn);
    const user = useSelector((state) => state.auth.user);


    console.log('this is it ->', user);

    const [logIn, setLogInModal] = useState(false);
    const [signUp, setSignUpModal] = useState(false);
    const navigate = useNavigate();

    const modalLogInHandler = () => {
        // if(logIn){
        if (logIn)
            navigate('explore');
        else
            navigate('login');

        setLogInModal((prevState) => !prevState);
        // }
        // else if(signUp){
        //setSignUpModal((prevState) => !prevState);
        // }
    }

    const modalSignUpHandler = () => {
        // if (signUp)
            // navigate('explore');
        // else
            // navigate('signup');

        setSignUpModal((prevState) => !prevState);
    }

    const dispatch = useDispatch();

    const logOutHandler = () => {
        console.log('logginout');
        dispatch(authLogOut(user.email));
        navigate('explore');
    }

    return (
        <Fragment>
            {logIn && <LogInModal
                onConfirm={modalLogInHandler}
            />}
            {signUp && <SignUpModal
                onConfirm={modalSignUpHandler} />
            }
            <div className={classes.leftNav}>
                <div className={classes.leftNavList}>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <NavList />
                    <button className={classes.leftNavBtn}>Tweet</button>
                </div>
                {/* { logStatus && <Cart><UserCart /> <UserLogOut/></Cart>} */}
                <Cart> {logStatus ? (
                    <Fragment>
                        <UserCart /> 
                        <button onClick={logOutHandler} className={classes.logOutBtn}>Log Out</button>
                        </Fragment>
                    ) : 
                    (
                        <Fragment>
                            <UserCartButton onClick={modalLogInHandler}>
                                LogIn
                            </UserCartButton>
                            <UserCartButton onClick={modalSignUpHandler}>
                                SignUp
                            </UserCartButton>
                        </Fragment>
                    )} </Cart>
            </div>
        </Fragment>
    )

}

export default LeftNavigation;