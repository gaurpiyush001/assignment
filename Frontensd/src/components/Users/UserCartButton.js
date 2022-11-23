import classes from "./UserCartButton.module.css";

const UserCartButton = (props) => {

    const toggleFun = () => {
        props.onClick();
    }
{/* <button className={classes.userCartBtn} onClick={toggleFun}>{props.children}</button> */}
    // console.log('where I am ', props.children);
    return (
        <button className={classes.userCartBtn} onClick={toggleFun}>{props.children}</button>
    )

}

export default UserCartButton;