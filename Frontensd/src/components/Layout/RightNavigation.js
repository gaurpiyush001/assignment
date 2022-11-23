import classes from './RightNavigation.module.css';
import Cart from './../Users/Cart';
import UserCart from './UserCartRightNav';


const RightNavigation = (props) => {

    console.log(props.users);
    return (
        <div>
            <h1>Who You Want To Follow</h1>

            <div className={classes.followBlock}>
                {
                    props?.users && props.users.map(({name, email, id}) => {
                        let user = {
                            name,
                            email,
                            id
                        }
                        return (
                            <Cart key={id}>
                                    <UserCart user={user}/> 
                                    <button className={classes.followBtn}>Follow</button>
                            </Cart>
                        )
                    })
                }
            </div>

        </div>
    )

}

export default RightNavigation;