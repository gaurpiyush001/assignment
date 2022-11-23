import Backdrop from "./Backdrop";
import { createPortal } from "react-dom";
import CardModal from "./CardModal";
import UserCartButton from "../../../Users/UserCartButton";
import classes from "./SignUpModal.module.css";
import { Fragment, useRef, useState } from "react";
import { useDispatch, useSelector  } from "react-redux";
import { authSignUp } from "../../../../store/actions/user-actions";
  
  const SignUpOverlay = (props) => {

    const inputRefPassword = useRef();
    const inputRefEmail = useRef();
    const inputRefName = useRef();
    const inputRefConfirmPassword = useRef();
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
        console.log(inputRefEmail.current.value, inputRefPassword.current.value, inputRefName.current.value)
        if(inputRefEmail.current.value === '' || inputRefPassword.current.value==='' || inputRefName.current.value === '' || inputRefConfirmPassword.current.value === '' || inputRefConfirmPassword.current.value!=inputRefPassword.current.value){
            errorHandler();
            return;
        }

        const user = {
            email: inputRefEmail.current.value,
            password: inputRefPassword.current.value,
            confirmPassword: inputRefConfirmPassword.current.value,
            name: inputRefName.current.value
        }

        console.log('user', user);
        //yaha mujhe call krni hai iss --> /signup endpoint ke liye backend ko
        dispatch(authSignUp(user));

        toggleFun();
    }

    const onFocusHandler = () => {
        setError(false);
    } 



    return (
      <CardModal className={classes.modal}>
            <form onFocus={onFocusHandler} onSubmit={LogInSubmissionHandler} className={classes.form}>
                <h1>Sign Up</h1>
                <div className={classes.name}>
                    <label htmlFor="name">Name*</label>
                    <input ref={inputRefName} name="name"></input>
                </div>
                <div className={classes.email}>
                    <label htmlFor="email">Email*</label>
                    <input ref={inputRefEmail} name="email"></input>                  
                </div>
                <div className={classes.password}>
                    <label htmlFor="password">Password*</label>
                    <input ref={inputRefPassword} name="password"></input>                  
                </div>
                <div className={classes.password}>
                    <label htmlFor="password">Confirm Password*</label>
                    <input ref={inputRefConfirmPassword} name="password"></input>                  
                </div>
                {error && <span className={classes.spanError}>Please try again, with correct credentials!</span>}
                <button className={classes.Btn} >Log In</button>
            </form>
      </CardModal>
    );
  };
  
  const SignUpModal = (props) => {
    return (
      <Fragment>
        {createPortal(
          <Backdrop onConfirm={props.onConfirm} />,
          document.getElementById('backdrop-root')
        )}
        {createPortal(
          <SignUpOverlay
            title={props.title}
            message={props.message}
            onConfirm={props.onConfirm}
          />,
          document.getElementById('overlay-root')
        )}
      </Fragment>
    );
  };


  export default SignUpModal;