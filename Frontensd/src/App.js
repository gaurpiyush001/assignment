import './App.css';
import Wrapper from './components/Wrapper/Wrapper';
import LeftNavigation from './components/Layout/LeftNavigation';
import RightNavigation from './components/Layout/RightNavigation';
import CenterFeed from './components/Layout/CenterFeed';
// import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from './store/reducers/auth-slice';
import axios from 'axios';

axios.defaults.withCredentials = true



function App() {

  // const logged = useSelector(state => state.auth.loggedIn);
  // console.log(logged);
  const dispatch = useDispatch();
  const [usersToFollow, setUsers] = useState();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('user'));
    if (items) {
     dispatch(authActions.logInSuccess(items));
    }

    console.log('getAllUsers');
    // const { data } = axios.get(
    //   `http://localhost:3001/api/v1/users/`
    // )
    fetch('http://localhost:3001/api/v1/users/')
    .then(res => res.json())
    .then(data => setUsers(data.data.users)) 

    


      // console.log('ARRRRA HAIII', email, password, confirmPassword, name)
  
      // dispatch({ type: SIGNUP_GET_REQUEST })
      // localStorage.removeItem("user");
      
      // dispatch(authActions.logOutSuccess())


  }, []);

  return (
    <Wrapper>
      <LeftNavigation />
      <CenterFeed />
      <RightNavigation users={usersToFollow} />
    </Wrapper>
  )

}

export default App;
