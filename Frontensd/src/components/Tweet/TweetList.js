import TweetDisplayBlock from "./TweetDisplayBlock";
import classes from "./TweetList.module.css";

const TweetList = (props) => {

    return (
        // {props.tweets.map(ele => {
        //     <TweetDisplayBlock 
        //         userImg = {ele.userImg}
        //         userName = {ele.name}
        //         userPostText = {ele.text}
        //     />
        // })}
        <div className={classes.tweetList}>
            <TweetDisplayBlock name="Piyush Gaur" id="gaurpiyush001" text="hi fbwshb wbufiswb wiub fwib wiub fwibf wibef wibuf wibfwibu iwubefiwub wfwffw wefwf wfew" like="0"/>
            <TweetDisplayBlock name="Akshay Kumar" id="singhisking48" text="hi fbwshb wbufiswb wiub fwib wiub fwibf wibef wibuf wibfwibu iwubefiwub wfwffw wefwf wfew" like="0"/>
        </div>
    )

}

export default TweetList;