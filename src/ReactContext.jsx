/**
 * create context inside our react app to hold the information about the current logged in user
    for that we will craete UserContext
 */

import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";


export const UserContext = createContext({}); // the context initial value is null

export function UserContextProvider({children}) {
    const [currentUsername, setCurrentUsername] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);
    const [onlinePeople, setOnlinePople] = useState({});
    const [offlinePeople, setOfflinePeople] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [selectedUsername, setSelectedUsername] = useState(null);
    const [activeStatus, setActiveStatus] = useState(null);
    const [activeNowVisible, setActiveNowVisible] = useState(null)
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [selectedUserPhoto, setSelectedUserPhoto] = useState(null);
    const [groups, setGroups] = useState([]);
    const [ defaultEmoji, setDefaultEmoji ] = useState("");
    const [defaultChatColor, setDefaultChatColor] = useState("")

    const [currentGroupMembers, setCurrentGroupMembers ] = useState([]);



    useEffect(() => {
        axios.get('/profile').then(res => {
            const {userId, username, activeStatus, activeNowVisible, profilePicture} =  res.data;
            console.log("inside usercontext", res.data);
            setCurrentUserId(userId);
            setCurrentUsername(username);
            setActiveStatus(activeStatus);
            setActiveNowVisible(activeNowVisible);
            if (profilePicture) 
                setProfilePhoto(`${axios.defaults.baseURL}/uploads/profile_pictures/${profilePicture}`)
            console.log("user details", {currentUserId, currentUsername, activeStatus, activeNowVisible, profilePhoto});
        })

    })

    // useEffect(() => {
    //     axios.get(`/groups/${currentUserId}`).then(({ data }) => { 

    //         console.log("user groups is ", data);
    //         setGroups(prev => [...prev, data.groups])
    //         console.log("groups inside state is ", groups);
    //     })
    // }, [currentUserId])
    
    return (
        //
        <UserContext.Provider value={{
            currentGroupMembers,
            setCurrentGroupMembers,
            defaultChatColor,
            setDefaultChatColor,
            defaultEmoji, 
            setDefaultEmoji,
            groups, 
            setGroups,
            selectedUserPhoto,
            setSelectedUserPhoto,
            profilePhoto,
            setProfilePhoto,
            setActiveStatus,
            activeStatus,
            setActiveNowVisible,
            activeNowVisible,
            currentUsername,
            setCurrentUsername,
            currentUserId,
            setCurrentUserId,
            onlinePeople,
            setOnlinePople,
            offlinePeople,
            setOfflinePeople,
            selectedUserId,
            setSelectedUserId,
            selectedUsername,
            setSelectedUsername,
        }}>{children}</UserContext.Provider>
    )
}
