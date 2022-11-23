import classes from "./TweetInputBlock.module.css";
import ProfileIcon from "./../../assets/default.jpg";
import { useDispatch, useSelector } from "react-redux";
import { authUserPost } from "../../store/actions/user-actions";
import { useRef } from "react";

const TweetInputBlock = (props) => {

    const InputRef = useRef();
    const dispatch = useDispatch();

    const user = useSelector(state => state.auth.user); 
    console.log('in tweetinputblock', user);

    // <form className={classes["form__input"]}>
    //     <img src={props.icon} alt={props.text}></img>
    //     <div>
    //         <input placeholder="What's happening"></input>

    //         {/* {selectedFile &&  <img src={preview} /> } */}

    //         {/* <div> */}
                
    //             {/* <input type='file' onChange={onSelectFile} /> */}

    //             <button>Tweet</button>

    //         {/* </div> */}

    //     </div>

    // </form>

    const onClickHandler = () =>{
        let postText = InputRef.current.value;
        dispatch(authUserPost(postText, user.email, user.name));
        InputRef.current.value = "";
    }

    return (
     <form className={classes["form__input"]}>
        <img className={classes["form__img"]} src={ProfileIcon} alt={props.text}></img>
        <div className={classes["form__detail"]}>
            <input ref={InputRef} placeholder="What's happening"></input>

            {/* {selectedFile &&  <img src={preview} /> } */}

            {/* <div> */}
                
                {/* <input type='file' onChange={onSelectFile} /> */}

                <button onClick={onClickHandler}>Tweet</button>

            {/* </div> */}

        </div>

    </form>       
    )

}

export default TweetInputBlock;