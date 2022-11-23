import CardModal from "./CardModal";
import Backdrop from "./Backdrop";
import { createPortal } from "react-dom";
import UserCartButton from "../../../Users/UserCartButton";
import classes from "./LogInModal.module.css";
import { Fragment } from "react";
import { useRef, useState } from "react"; 
import { useDispatch } from "react-redux";
import { authLogIn } from "../../../../store/actions/user-actions";

const LogInOverlay = (props) => {



    const inputRefPassword = useRef();
    const inputRefEmail = useRef();
    const dispatch = useDispatch();

    const [error, setError] = useState(false);

    const toggleFun = () => {
        // e.preventDefault();
        props.onConfirm();
    }

    const errorHandler = () => {
        setError((prevState) => !prevState);
    }

    const LogInSubmissionHandler = (event) => {
        event.preventDefault();
        // console.log(event);
        if(inputRefEmail.current.value === '' || inputRefPassword.current.value===''){
            errorHandler();
            return;
        }

        const email = inputRefEmail.current.value;
        const password = inputRefPassword.current.value;
        
        dispatch(authLogIn({email, password}));

        // console.log(inputRefPassword.current.value);
        toggleFun();
    }

    const onFocusHandler = () => {
        setError(false);
    }

    return (
        <CardModal className={classes.modal}>
            <form onFocus={onFocusHandler} onSubmit={LogInSubmissionHandler} className={classes.form}>
                <h1>Log In</h1>
                <div className={classes.email}>
                    <label name="email">Email</label>
                    <input ref={inputRefEmail} htmlFor="email"></input>                  
                </div>
                <div className={classes.password}>
                    <label htmlFor="password">Password</label>
                    <input ref={inputRefPassword} name="password"></input>                  
                </div>
                {error && <span className={classes.spanError}>Please try again, with correct credentials!</span>}
                {/* <UserCartButton>LogIn</UserCartButton> */}
                <button className={classes.Btn} >Log In</button>
            </form>
        </CardModal>
    );
};

const LogInModal = (props) => {
    return (
        <Fragment>
            {createPortal(
                <Backdrop onConfirm={props.onConfirm} />,
                document.getElementById('backdrop-root')
            )}
            {createPortal(
                <LogInOverlay
                    title={props.title}
                    message={props.message}
                    onConfirm={props.onConfirm}
                />,
                document.getElementById('overlay-root')
            )}
        </Fragment>
    );
};

export default LogInModal;