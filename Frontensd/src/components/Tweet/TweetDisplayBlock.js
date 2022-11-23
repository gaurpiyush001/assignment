import LikeIcon from "../../assets/svg/LikeIcon";
import classes from "./TweetDisplayBlock.module.css";
import UserProfilePic from './../../assets/default.jpg'

const TweetDisplayBlock = (props) =>{

    return (
        <div className={classes.tweetDisplay}>
            <img className={classes["tweetDisplay--img"]} src={UserProfilePic} ></img>
            <div className={classes["tweetDisplay--info"]}>
                <div>{props.name}</div>
                <div className={classes["tweetText"]}>{props.text}</div>
                <div className={classes["tweetReactions"]}>
                    <LikeIcon />
                    <div>{props.like}</div>
                </div>
            </div>
        </div>
    )

}

export default TweetDisplayBlock;