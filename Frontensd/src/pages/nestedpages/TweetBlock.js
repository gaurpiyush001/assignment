const TweetBlock = (props) => {

    return (
        <div>
            <img></img>
            <div>
                <div>
                <div>{props.text}<span>{props.userId} || {props.time}</span></div>
                <button>***</button>
                {/*State Wise load krna hai*/}
                <button>Delete</button>
                </div>

                <p>{props.postText}</p>
                {/*Below element is optional is Only if there is any image*/}
                <img src={props.img} alt={props.img}></img>
                <div>
                    <button>Like</button>
                </div>
            </div>
        </div>
    )

}

export default TweetBlock;