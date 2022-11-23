import classes from './UserCartLogOut.module.css';
import { useDispatch } from 'react-redux';
import { authLogOut } from '../../store/actions/user-actions';
import { useNavigate } from 'react-router-dom';

const UserLogOut = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOutHandler = () => {
        dispatch(authLogOut);
        console.log('logginout');
        navigate('explore');
    }

    return <button onClick={logOutHandler} className={classes.logOutBtn}>Log Out</button>
}

export default UserLogOut;