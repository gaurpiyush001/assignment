import UserLogOut from './UserCartLogOut';
import classes from './UserCart.module.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import userProfileImg from './../../assets/default.jpg';


const UserCart = (props) => {


    // const logStatus = useSelector((state) => state.auth.loggedIn);
    const user = useSelector((state) => state.auth.user);
    console.log('userCart', user);

    return (


            
            // <Link to={'../'+props.userId} className={classes['UserCart__Link']}>
            //     <img className={classes['UserCart__Link--img']} src={props.icon} alt={props.text}></img>
            //     <div className={classes['UserCart__Link--detail']}>
            //         <div>{props.name}</div>
            //         <div>{props.userId}</div>
            //     </div>
            // </Link>

            <div className={classes['UserCart__Link']}>
                          <img className={classes['UserCart__Link--img']} src={userProfileImg} alt={user.name}></img>
                <div className={classes['UserCart__Link--detail']}>
                     <div>{user.name}</div>
                     <div>{user.email.substring(0, user.email.indexOf('@'))}</div>
                 </div>
            </div>

            



    )
}

export default UserCart;