import React, { useContext, useEffect, useMemo, useState } from 'react'
import { UserContext } from '../ReactContext'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Avatar from './Avatar';
import axios from 'axios';



function ActiveNow() {
    const { onlinePeople, offlinePeople, currentUserId, selectedUsername, selectedUserId, setSelectedUserId, setSelectedUsername } = useContext(UserContext);
    const { activeNowVisible, setActiveNowVisible, setSelectedUserPhoto } = useContext(UserContext)

    const [activeNow, setActiveNow] = useState(activeNowVisible);

    useEffect(() => {
        setActiveNow(activeNowVisible);
    }, [activeNowVisible])

    // useEffect(() => {
    //     if(activeNowVisible !== undefined) {
    //         axios.put(`/user?search=activeNowVisible&state=${activeNow}`)
    //         setActiveNowVisible(activeNow)
    //     }
    // }, [activeNow])



    //    console.log("active now status", activeNowVisible);
    return (
        <>
            <div className={`mx-4 my-4 ${activeNow ? 'visible' : 'hidden'}`}>

                <div className='flex items-center'>
                    <span className=' flex-grow text-gray-500 inline-block ml-1'>Active now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        className="w-6 h-6 rotate-90 cursor-pointer"
                    // onClick={() => setActiveNow(!activeNow)}
                    >
                        <path fillRule="evenodd" d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" clipRule="evenodd" />
                    </svg>
                </div>

                <Swiper className=' my-3 mx-5 pb-10 '
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={10}
                    slidesPerView={6}
                    // navigation
                    // pagination={{ clickable: true, progressbarFillClass: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('slide change')}
                >

                

                    {offlinePeople && (

                        Object.keys(offlinePeople).filter(userId => userId !== currentUserId).map(userId =>

                            <SwiperSlide key={userId}
                                className={`my-2 flex flex-col items-start align-middle gap-0 border-b cursor-pointer ${userId === selectedUserId ? ' opacity-70' : ""}`}
                                onClick={() => { setSelectedUserId(userId); setSelectedUsername(offlinePeople[userId].username);
                                    setSelectedUserPhoto(offlinePeople[userId].profilePicture == ''? undefined: `${axios.defaults.baseURL}/uploads/profile_pictures/${offlinePeople[userId].profilePicture}`)
                                
                                }}
                            >
                               {offlinePeople[userId].profilePicture === '' && <Avatar online={true} username={offlinePeople[userId].username} userId={userId} />}
                                {offlinePeople[userId].profilePicture !== '' && <img className='w-8 h-8 text-center rounded-full' src={`${axios.defaults.baseURL}/uploads/profile_pictures/${offlinePeople[userId].profilePicture}`} />}
                                <div className='text-gray-800 overflow-x-hidden'>{offlinePeople[userId].username}</div>

                            </SwiperSlide>
                        )
                    )}

                </Swiper>
                <hr />
            </div>
        </>
    )
}

export default ActiveNow

  // <ActiveContact
                            //     key={userId}
                            //     selected={userId === selectedUserId}
                            //     id={userId}
                            //     username={offlinePeople[userId]}
                            //     onClick={() => { setSelectedUserId(userId); setSelectedUsername(offlinePeople[userId]) }}

                            // />