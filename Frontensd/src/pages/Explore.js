//yaha se post document ko get krdey, dikhadey sb

// import { useEffect } from "react";
import Search from './../components/UI/Search/Search';
import TweetBlock from './nestedpages/TweetBlock';
import classes from './Explore.module.css'
import TweetList from '../components/Tweet/TweetList';
import TweetInputBlock from '../components/Tweet/TweetInputBlock';


const Explore = () => {

    // const [post, setPost] = useState();

    // useEffect(() => {
    //     //yaha apne backend ke /getPost waaley route ko call krna hai
    // }, [])

    console.log('explore');

    return (

        <div className={classes.explore}>
            {/* <Search /> */}
            {/* <TweetInputBlock /> */}
            {/* <div> */}
                {/* {
                    props.map((ele) => {
                        return (
                            <TweetBlock 
                                userImg = {ele.userImg}
                                userName = {ele.userName}
                                userId = {user.userId}
                                userPostText = {user.text}
                                userPostImg={user.PostImg}
                            />
                        )
                    })
                } */}
                {/* TWEETS */}
            {/* </div> */}
            <TweetList />
        </div>
    )
}

export default Explore;