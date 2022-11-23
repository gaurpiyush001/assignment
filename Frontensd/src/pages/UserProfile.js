import { Fragment } from 'react';
import { Routes } from 'react-router-dom';
// import UserProfileBookmarks from './nestedpages/UserProfileBookmarks';
// import UserProfileLikes from './nestedpages/UserProfileLikes';
// import UserProfileTweets from './nestedpages/UserProfileTweets';
import UserProfileHeader from './UserProfileHeader';
import classes from "./UserProfile.module.css"
import UserProfileTweets from './nestedpages/UserProfileTweets';

const UserProfile = (props) => {
    console.log('helllo in userprofile even after hitting explore route');

    return (
        // <Fragment>
            // {/* <UserNav /> */}
            // {/* <Routes path="tweets" element={UserProfileTweets}></Routes> */}
            // {/* <Routes path="likes" element={UserProfileLikes}></Routes> */}
            // {/* <Routes path="bookmark" element={UserProfileBookmarks}></Routes> */}
        // </Fragment>
        <div className={classes["userProfile"]}>
            <UserProfileHeader />
            <UserProfileTweets />
        </div>

    )

}

export default UserProfile;