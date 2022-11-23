import TweetInputBlock from "../components/Tweet/TweetInputBlock";
import { useSelector } from "react-redux";
// import TweetBlock from "./nestedpages/TweetBlock";
import classes from "./Home.module.css"
import TweetList from "../components/Tweet/TweetList";
import TweetDisplayBlock from "../components/Tweet/TweetDisplayBlock";
import profilePhoto from './../assets/default.jpg';


const Home = () => {

    const user = useSelector((state) => state.auth.user);


    //this will has all information of post to represent the for particular logged in user and details about also--->user.following
    const followingPost = user?.following;

    return (
        <div className={classes.home}>
            
            <TweetInputBlock userImg={profilePhoto}/>

            {/*Now Display all the tweets of all folks which this particular loggedIn user is following*/}
            
            {/* <div className={classes["home__tweetblock"]}> */}
                <TweetList />
                {
                    followingPost && followingPost.map((ele) => {
                        <TweetDisplayBlock 
                            userImg = {ele.userImg}
                            userName = {ele.name}
                            created = {ele.created}
                            likes = {ele.likes}
                            userId = {ele.userId}
                        />
                    })
                }
            {/* </div> */}
            

        </div>

    )
}

export default Home;