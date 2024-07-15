import { useContext } from 'react';
import { UserContext } from '../ReactContext';
import Contact from './Contact';
import axios from 'axios';

function UsersSearchList({ searchKey, settingSelected = undefined }) {

    const {
        onlinePeople,
        offlinePeople,
        currentUserId,
        selectedUserId,
        setSelectedUserId,
        setSelectedUserPhoto,
        setSelectedUsername,

    } = useContext(UserContext);

    return (
        <>


            {onlinePeople && (
                Object.keys(onlinePeople).filter(userId => userId !== currentUserId && onlinePeople[userId].username.toLowerCase().includes(searchKey.toLowerCase())).map(userId =>
                    <Contact
                        key={userId}
                        selected={userId === selectedUserId}
                        id={userId}
                        username={onlinePeople[userId].username}
                        online={(!onlinePeople[userId].activeStatus ? undefined : true)}
                        profilePicture={onlinePeople[userId].profilePicture === '' ? undefined : onlinePeople[userId].profilePicture}
                        onClick={() => {
                            setSelectedUserId(userId);
                            setSelectedUsername(onlinePeople[userId].username)
                            setSelectedUserPhoto(onlinePeople[userId].profilePicture == '' ? undefined : `${axios.defaults.baseURL}/uploads/profile_pictures/${onlinePeople[userId].profilePicture}`)
                            // dispatch({type: "setChatVisible"})
                            // dispatch({type: "clrSettingVisible"}) 
                            // console.log("state of the display ", displayState);  

                        }}
                        settingSelected={settingSelected}

                    />
                )
            )}

            {offlinePeople && (

                Object.keys(offlinePeople).filter(userId => userId !== currentUserId && offlinePeople[userId].username.toLowerCase().includes(searchKey.toLowerCase())).map(userId =>
                    <Contact
                        key={userId}
                        selected={userId === selectedUserId}
                        id={userId}
                        username={offlinePeople[userId].username}
                        online={false}
                        profilePicture={offlinePeople[userId].profilePicture === '' ? undefined : offlinePeople[userId].profilePicture}
                        onClick={() => {
                            setSelectedUserId(userId)
                            setSelectedUsername(offlinePeople[userId].username);
                            setSelectedUserPhoto(offlinePeople[userId].profilePicture === '' ? undefined : `${axios.defaults.baseURL}/uploads/profile_pictures/${offlinePeople[userId].profilePicture}`)
                            // setSelectedUserPhoto(offline)
                            // console.log("selected user id", selectedUserId, "selected username", selectedUsername); 
                        }
                        }
                    />
                )
            )}

        </>
    )
}

export default UsersSearchList