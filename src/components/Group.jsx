import React, { forwardRef, useContext, useImperativeHandle, useState } from 'react'
import { UserContext } from '../ReactContext';
import classNames from 'classnames';
import UsersSearchList from './UsersSearchList';
import axios from 'axios';
import Contact from './Contact';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import NewGroupLayout from './NewGroupLayout';


const Group = forwardRef(({ settingSelected, setSettingSelected }, ref)  => {

    const [searchKey, setSearchKey] = useState("");
    const { onlinePeople } = useContext(UserContext);
    const { offlinePeople } = useContext(UserContext);
    const { currentUserId, currentUsername, activeStatus, profilePhoto } = useContext(UserContext);
    const { selectedUserId, setSelectedUserId } = useContext(UserContext);
    const { selectedUsername, setSelectedUsername, setSelectedUserPhoto, 
        
    
    } = useContext(UserContext)

    const [groupVisible, setGroupVisible] = useState(false)
    const [groupMembers, setGroupMembers] = useState([{
        
            userId: currentUserId,
            username: currentUsername,
            profilePicture: profilePhoto && profilePhoto.substring(`${axios.defaults.baseURL}/uploads/profile_pictures/`.length),
            activeStatus
    }]);


    useImperativeHandle(ref, () => ({
        getGroupMembers() {
            return groupMembers;
        },

        updateGroupMembers() {
            return setGroupMembers(prev => prev.filter(member => member.userId !== userId));
        }
    }))

    return (
        <>

            <div className={classNames(' bg-white  w-full m-0 fixed  inset-0  box-border transition-all duration-500', {
                "visible": settingSelected === "create group",
                "hidden": settingSelected === ""
            })}>

                <div className='flex items-center gap-4 py-2 px-4 bg-white shadow-sm'>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className=" w-6 h-6 text-black cursor-pointer hover:opacity-60"
                        onClick={() => setSettingSelected("")}

                    >
                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clipRule="evenodd" />
                    </svg>

                    <input type="text" placeholder='Search' className=' block /**border-b-2 border-gray-400*//  p-2 focus:outline-none'
                        onChange={(e) => setSearchKey(e.target.value)}

                    />

                </div>

                <hr  className=' block m-0 p-0 bg-gray-400'/>

                {/* <Swiper className=''
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={4}
                    slidesPerView={3.5}
                    // navigation
                    // pagination={{ clickable: true, progressbarFillClass: true }}
                    scrollbar={{ draggable: true }}
                    // onSwiper={(swiper) => console.log(swiper)}
                    // onSlideChange={() => console.log('slide change')}
                >

                    {groupMembers.map(member =>

                        <SwiperSlide className='w-fit'>

                            <div className=' inline-flex gap-2 items-cente bg-slate-50 p-2 rounded-3xl text-black w-fit my-4'>
                                <span>{member.username}</span>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    className="w-6 h-6 bg-gray-200 text-gray-400 cursor-pointer"
                                    onClick={() => { setGroupMembers(prev => prev.filter(elem => elem.username !== member.username)) }}

                                >
                                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                </svg>

                            </div>

                        </SwiperSlide>
                    )}

                </Swiper> */}



                { groupVisible && <div className= {classNames(
                    'flex gap-2 mx-auto w-11/12 px-4 pb-4 overflow-x-auto', {
                        'my-7': groupMembers.length !== 0 
                    }
                )}>
                    {groupMembers.filter(member => member.userId !== currentUserId).map(member =>

                        <div className=' inline-flex gap-2 items-center bg-gray-100 p-2 rounded-xl text-black w-fit'>
                            <span>{member.username}</span>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                className="w-6 h-6 bg-gray-200 text-gray-400 cursor-pointer"
                                onClick={() => { setGroupMembers(prev => prev.filter(elem => elem.username !== member.username)) }}

                            >
                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                            </svg>

                        </div>
                    )}

                </div>
                }



                <div className='flex flex-col gap-2 justify-start mt-2 px-4'>
                    {!groupVisible && <div className='flex gap-2 items-center p-2 hover:bg-gray-200 cursor-pointer'

                        onClick={() => setGroupVisible(true)}
                    >
                        <span className=' bg-gray-100 rounded-full p-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                                <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                            </svg>


                        </span>

                        <span className=' text-black'>Create a new group</span>
                    </div>
                    }

                    <span className=' text-gray-400'>suggested</span>

                    {/* <UsersSearchList searchKey={searchKey} settingSelected={settingSelected}/> */}

                    <div className='flex flex-col'>

                        {onlinePeople && (
                            Object.keys(onlinePeople).filter(userId => userId !== currentUserId && onlinePeople[userId].username.toLowerCase().includes(searchKey.toLowerCase())).map(userId =>
            
                                <div className='flex'>
                                    
                                    <div className='flex-grow'>
                                        <Contact
                                            key={userId}
                                            selected={selectedUserId === userId}
                                            id={userId}
                                            username={onlinePeople[userId].username}
                                            online={(!onlinePeople[userId].activeStatus ? undefined : true)}
                                            profilePicture={onlinePeople[userId].profilePicture === '' ? undefined : onlinePeople[userId].profilePicture}
                                            onClick={() => {
                                                if (!groupVisible) {
                                                    setSelectedUserId(userId);
                                                    setSelectedUsername(onlinePeople[userId].username)
                                                    setSelectedUserPhoto(onlinePeople[userId].profilePicture == '' ? undefined : `${axios.defaults.baseURL}/uploads/profile_pictures/${onlinePeople[userId].profilePicture}`)
                                                    // dispatch({type: "setChatVisible"})
                                                    // dispatch({type: "clrSettingVisible"}) 
                                                    // console.log("state of the display ", displayState);  
                                                } else {
                                                    if (!groupMembers.find(elem => elem.userId === userId)) {
                                                        setGroupMembers(prev => [...prev, { userId, username: onlinePeople[userId].username, profilePicture: onlinePeople[userId].profilePicture, activeStatus: onlinePeople[userId].activeStatus || false, }]);
                                                    } else {
                                                        setGroupMembers(prev => prev.filter(elem => elem.userId !== userId))
                                                        console.log("groupMembers now are ", groupMembers);
                                                    }
                                                }
                                            }}
                                            settingSelected={settingSelected}

                                        />
                                    </div>

                                    {groupVisible && groupMembers.find(elem => elem.userId === userId) && <input type="radio" name="" id="" checked />}
                                    {groupVisible && !groupMembers.find(elem => elem.userId === userId) && <input type="radio" name="" id="" />}

                                </div>
                            )
                        )}

                        {offlinePeople && (
                            Object.keys(offlinePeople).filter(userId => userId !== currentUserId && offlinePeople[userId].username.toLowerCase().includes(searchKey.toLowerCase())).map(userId =>

                                <div className='flex'>

                                    <div className='flex-grow'>
                                        <Contact
                                            key={userId}
                                            selected={selectedUserId === userId}
                                            id={userId}
                                            username={offlinePeople[userId].username}
                                            online={false}
                                            profilePicture={offlinePeople[userId].profilePicture === '' ? undefined : offlinePeople[userId].profilePicture}
                                            onClick={() => {
                                                if (!groupVisible) {
                                                    setSelectedUserId(userId)
                                                    setSelectedUsername(offlinePeople[userId].username);
                                                    setSelectedUserPhoto(offlinePeople[userId].profilePicture === '' ? undefined : `${axios.defaults.baseURL}/uploads/profile_pictures/${offlinePeople[userId].profilePicture}`)
                                                    // setSelectedUserPhoto(offline)
                                                    // console.log("selected user id", selectedUserId, "selected username", selectedUsername); 
                                                } else {
                                                    if (!groupMembers.find(elem => elem.userId === userId)) {
                                                        setGroupMembers(prev => [...prev, { userId, username: offlinePeople[userId].username, profilePicture: offlinePeople[userId].profilePicture, activeStatus: false }]);
                                                    } else {
                                                        setGroupMembers(prev => prev.filter(elem => elem.userId !== userId))
                                                        console.log("groupMembers now are ", groupMembers);
                                                    }
                                                    console.log("groupMembers now are ", groupMembers);
                                                }
                                            }
                                            }
                                        />

                                    </div>
                                    {/* {groupVisible && <input type="radio" name="" id="" />} */}
                                    {groupVisible && <input type="radio" name="" id="" checked={groupMembers.find(elem => elem.userId === userId)} />}
                                    {/* {groupVisible && !groupMembers.find(elem => elem.userId === userId) &&<input type="radio" name="" id="" />} */}


                                </div>

                            )
                        )}


                    </div>



                </div>
                {groupVisible && <div className=' sticky bottom-0 left-0 p-2 bg-white border-gray-400 shadow-md m-0 w-full cursor-pointer '>
                    <div className='bg-gray-300 text-gray-500 text-center p-1 m-0 hover:text-black hover:translate-y-0.5 transition-all duration-200'
                        onClick={() => setSettingSelected("create new group")}
                    >

                        START GROUP CHAT
                    </div>
                </div>}

                {/* {settingSelected === "create new group" && <NewGroupLayout />} */}
            </div>
        </>
    )
})

export default Group