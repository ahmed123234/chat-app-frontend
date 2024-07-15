import React, { useContext, useState } from 'react'
import Contact from './Contact';
import { UserContext } from '../ReactContext';
import axios from 'axios';
import UsersSearchList from './UsersSearchList';

function Search() {

    const { onlinePeople } = useContext(UserContext);
    const { offlinePeople } = useContext(UserContext);
    const { currentUserId } = useContext(UserContext);
    const { selectedUserId, setSelectedUserId } = useContext(UserContext);
    const { selectedUsername, setSelectedUsername, setSelectedUserPhoto } = useContext(UserContext)
    const [searchKey, setSearchKey] = useState("");

    return (
        <>
            <div className='overflow-y-auto h-screen bg-white  w-full m-0'>
                <div className=' w-full flex justify-center  m-auto  relative'>

                    <div className=' relative grid grid-cols-1 w-full mx-3'>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-gray-500 top-1 right-5 absolute translate-y-1/2 translate-x-1/2">
                            <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
                        </svg>
                        <input type="text" className='my-2 p-2 border rounded-3xl  border-gray-600 focus:border-none'
                            onChange={(e) => setSearchKey(e.target.value)}

                            placeholder='Search'
                        />

                    </div>
                </div>

                <UsersSearchList searchKey={searchKey} />

            </div>

            {/* {onlinePeople && (
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
            )} */}

        </>
    )
}

export default Search