import React, { useContext } from 'react'
import ActiveNow from './ActiveNow';
import { UserContext } from '../ReactContext';
import Contact from './Contact';
import axios from 'axios';

function UsersList({ settingSelected, setSettingSelected }) {
    const {
        onlinePeople,
        offlinePeople,
        currentUserId,
        selectedUserId,
        setSelectedUserId,
        setSelectedUserPhoto,
        setSelectedUsername,
        selectedUsername,
        currentUsername,
        groups,
        setGroups,
        currentGroupMembers, 
        setCurrentGroupMembers,
        defaultEmoji, 
        setDefaultEmoji ,
        defaultChatColor,
        setDefaultChatColor

    } = useContext(UserContext);
    return (
        <>

            <div className=' bg-white  w-full m-0'>

                {settingSelected !== "create group" && <ActiveNow />}

                {console.log(groups)}
                {groups.length >= 1 && (

                    groups.map(group => {
                        console.log("inside groups, group is", group);
                        const { _id: groupId, name, profilePicture, members, chatColor, chatEmoji } = group;

                        if(groupId === selectedUserId) {
                            console.log("***********************", group );
                        }
                        return (
                            <Contact
                                key={groupId}
                                selected={groupId === selectedUserId}
                                id={groupId}
                                username={name}
                                online={false}
                                profilePicture={profilePicture === '' ? undefined : profilePicture}
                                onClick={() => {
                                    setSelectedUserId(groupId);
                                    setSelectedUsername(name)
                                    setSelectedUserPhoto(profilePicture == '' ? undefined : `${axios.defaults.baseURL}/uploads/profile_pictures/${profilePicture}`)
                                    setCurrentGroupMembers(members.map(member => ({id: member.userId,  username: member.username})))
                                    setDefaultEmoji(chatEmoji)
                                    setDefaultChatColor(chatColor)
                                }}

                            />)
                    }
                    )
                )}

                {onlinePeople && (

                    Object.keys(onlinePeople).filter(userId => userId !== currentUserId).map(userId =>
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
                                setCurrentGroupMembers([currentUsername, selectedUsername])
                                setDefaultEmoji('')
                                setDefaultChatColor('bg-blue-200')
                                // dispatch({type: "setChatVisible"})
                                // dispatch({type: "clrSettingVisible"}) 
                                // console.log("state of the display ", displayState);  

                            }}

                        />
                    )
                )}

                {offlinePeople && (

                    Object.keys(offlinePeople).filter(userId => userId !== currentUserId).map(userId =>
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
                                setSelectedUserPhoto(offlinePeople[userId].profilePicture == '' ? undefined : `${axios.defaults.baseURL}/uploads/profile_pictures/${offlinePeople[userId].profilePicture}`)
                                setCurrentGroupMembers([currentUsername, selectedUsername])
                                setDefaultEmoji('')
                                setDefaultChatColor('bg-blue-200')
                                // setSelectedUserPhoto(offline)
                                // console.log("selected user id", selectedUserId, "selected username", selectedUsername); 
                            }
                            }
                        />
                    )
                )}

            </div>
        </>
    )
}

export default UsersList